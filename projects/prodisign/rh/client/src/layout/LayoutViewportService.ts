import { Observable, Subscription } from 'rxjs';
import { Injectable, SkipSelf, Optional, ViewContainerRef, TemplateRef } from '@angular/core';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LayoutDialog } from './LayoutDialog';
// import { RawDict } from '@prodisign/rh/types';

@Injectable()
export class LayoutViewportService {
  constructor(
      @SkipSelf() @Optional() private readonly parent: LayoutViewportService,
      // private readonly dialog: MatDialog
    ) {

    if( parent == null ) {// fallback to self-controller, dialog
      // this.controllers = new RawDict<LayoutViewportService.Controller>();

      this
        .setController('default', this)
        .setController('dialog', this);

      // this._dialogs = new Map<LayoutViewportService.View, MatDialogRef<any>>();

    }
    else {
      // this.controllers = RawDict.extends(parent.controllers);

    }

  }


  private _closed = false;
  private _views: LayoutViewportService.View[] = [];

  readonly controllers: any; //: RawDict<LayoutViewportService.Controller>;

  ngDestroy() {
    this._closed = true;
    for(const view of this._views.slice())
      view.context.$implicit.complete();
  }


  setController(id: string, controller: LayoutViewportService.Controller) {
    this.controllers[id] = controller;
    return this;
  }

  getController(id: string) {
    return this.controllers[id] || this.controllers['default'];
  }

  attach<T>(id: string, templateRef: TemplateRef<any>, ctx = {}) {
    return new Observable<T>( subscriber => {
      if( this._closed ) {
        subscriber.complete();
        return;
      }

      const controller = this.getController(id);
      const subscriptions = new Subscription();



      const context: LayoutViewportService.Context = Object.assign({
        $implicit: Object.assign({ next, complete, close: complete }, ctx),
        dep: {}
      }, ctx);

      // for(const k in context.dep)
      //   subscriptions.add( context.dep[k].subscribe() );


      const view: LayoutViewportService.View = { templateRef, subscriptions, context };

      // add view to views
      this._views.push(view);

      controller.attachViewportView(view);

      return () => {
        controller.detachViewportView(view);
        view.subscriptions.unsubscribe();

        // remove view from view
        let i = this._views.indexOf(view);
        if( i < 0 )
          return;
        this._views.splice(i, 1);

      };

      function next(v: T) {
        subscriber.next(v);
      }

      function complete(v?: T) {
        if( arguments.length )
          subscriber.next(v);
        subscriber.complete();
      }

    });
  }

  // readonly _dialogs: Map<LayoutViewportService.View, MatDialogRef<any>> = null;

  attachViewportView(view: LayoutViewportService.View) {
    // const { dialog, _dialogs } = this;
    //
    // const dialogRef = this.dialog.open(LayoutDialog, {
    //   data: view
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   _dialogs.delete(view);
    // });
    // _dialogs.set(view, dialogRef);
  }

  detachViewportView(view: LayoutViewportService.View) {
    // const dialog = this._dialogs.get(view);
    // if( dialog != null )
    //   dialog.close();
  }

}

export namespace LayoutViewportService {

  export interface Context<T=any> {
    $implicit: {
      next(v: T);
      complete(v?: T);
    };
    // dep: RawDict<Observable<any>>; // dependency subscriptions
  }

  export interface View<T=any> {
    templateRef: TemplateRef<any>;
    subscriptions: Subscription;
    context: Context;
  }

  export interface Controller {
    attachViewportView(view: View);
    detachViewportView(view: View);
  }

}

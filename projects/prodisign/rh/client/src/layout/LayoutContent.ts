import { Component, Input, HostBinding, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './LayoutService';
import { LayoutModalViewport } from './LayoutModalViewport';

@Component({
  selector: 'cts-layout-content',// cts-layout-main-content
  styleUrls: [ './LayoutContent.scss' ],
  template: `
    <div class="curtain"></div>
    <cts-layout-modal-viewport #viewport
        (viewIndex)="_updateShow(_viewportViewIndex = $event)">
      <!-- <ng-content></ng-content> -->



      <router-outlet
          (activate)="_routerActivate($event)"
          (deactivate)="_routerDeactivate($event)">
      </router-outlet>
    </cts-layout-modal-viewport>
  `
})
export class LayoutContent {
  constructor(
    readonly layout: LayoutService) {
  }

  @ContentChild(RouterOutlet, {static: true})
  set routerOutlet(routerOutlet: RouterOutlet) {
    console.log("routerOUTlet", routerOutlet);
    //routerOutlet.
  }

  @HostBinding('class.active') _show: boolean = true;
  @ViewChild('viewport', {static: true}) _viewport: LayoutModalViewport = null;

  readonly _showMainContentSubscription = this.layout.showMainContent
    .subscribe( v => this._show = v );

  _viewportViewIndex = 0;
  _routerComponent: any = null;

  // _viewportViewIndex(index: number) {
  //   this._viewportViewIndex
  // }

  _routerActivate(component: any) {
    this._routerComponent = component;
    this._updateShow();
  }

  _routerDeactivate(component: any) {
    this._routerComponent = null;
    this._updateShow();
  }

  _updateShow(_?) {
    this._show = this._routerComponent || this._viewportViewIndex >= 0;

    console.log('UPDATE SHOW', this);
  }

  attach(template: TemplateRef<any>, ctx?) {
    return this._viewport.attach(template, ctx);
  }

}

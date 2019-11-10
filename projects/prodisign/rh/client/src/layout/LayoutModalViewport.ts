import { Component, Self, Output, EventEmitter, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { LayoutViewportService } from './LayoutViewportService';
import { Observable } from 'rxjs';

@Component({
	selector: 'cts-layout-modal-viewport',
	styleUrls: ['./LayoutModalViewport.scss'],
  providers: [
    LayoutViewportService
  ],
	template: `
    <div class="rh-modal-content"
				[class.active]="_viewIndex == -1">
      <ng-content></ng-content>
    </div>

    <ng-container *ngFor="let view of views; let i = index">
      <div class="rh-modal-content"
					[class.active]="i == _viewIndex">
<!--
				<ng-container *ngIf="typeof view.templateRef == 'function'">
				</ng-container>
-->

        <ng-container
            *ngTemplateOutlet="view.templateRef; context: view.context">
        </ng-container>
      </div>
    </ng-container>
  `
})
export class LayoutModalViewport {

  constructor(readonly changeDetectorRef: ChangeDetectorRef,
      @Self() readonly viewportService: LayoutViewportService) {

    viewportService.setController('modal', this);
    changeDetectorRef.markForCheck();
  }

	ngDestroy() {
		// TODO: remove controller from viewportServices..
		// detach all views
	}

	_viewIndex: number = -1;

	@Output()
	readonly viewIndex = new EventEmitter<number>();

  readonly views: LayoutViewportService.View[] = [ ];

  attach<T,R>(templateRef: TemplateRef<T>, ctx?:T): Observable<R> {
    return this.viewportService.attach('modal', templateRef, ctx);
  }

	open<T,R>(templateRef: TemplateRef<T>, ctx?:T): Promise<R> {
    return this.attach<T,R>(templateRef, ctx).toPromise();
  }


  attachViewportView(view: LayoutViewportService.View) {
    const { views, changeDetectorRef } = this;

		this.viewIndex.emit(this._viewIndex = views.length);
    views.push(view);
		console.log('CHANGE EMITTED', this);

    changeDetectorRef.markForCheck();


  }

	detachViewportView(view: LayoutViewportService.View) {
    const { views, changeDetectorRef } = this;
    let i = views.indexOf(view);
    if( i < 0 )
      return;

		if( this._viewIndex >= i )
			this.viewIndex.emit(this._viewIndex -= 1);

    views.splice(i, 1);
    changeDetectorRef.markForCheck();


  }

}

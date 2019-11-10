import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutService } from './LayoutService';
import { LayoutViewportService } from './LayoutViewportService';

import { LayoutNavbar } from './LayoutNavbar';
import { LayoutSidenav } from './LayoutSidenav';
import { LayoutContent } from './LayoutContent';
import { LayoutModalViewport } from './LayoutModalViewport';
// import { LayoutSearchService } from './LayoutSearchService';
import { LayoutDialog } from './LayoutDialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    LayoutService,
    LayoutViewportService,
  ],
  entryComponents: [
    LayoutDialog,
  ],
  declarations: [
    LayoutDialog,
    LayoutNavbar,
    LayoutContent,
    LayoutSidenav,
    LayoutModalViewport,
    // LayoutSearchService,
  ],
  exports: [
    LayoutNavbar,
    LayoutContent,
    LayoutSidenav,
    LayoutModalViewport,
    // LayoutSearchService,
  ]
})
export class LayoutModule {
}

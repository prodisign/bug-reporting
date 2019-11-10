import { Component } from '@angular/core';

@Component({
  selector: 'cts-layout-sidenav',
  styleUrls: [ './LayoutSidenav.scss' ],
  template: `
    <ng-content></ng-content>
  `
})
export class LayoutSidenav {
  // puede utilizar un geosphere state para indicar el padding
  // ...
  

  // Puede contener diferentes contents
  // de forma que pinte lo que deba pintar
  // algunas cosas en el toolbar, otras en el content y otras en el footer
  // creando el scrollbar a medida...

}

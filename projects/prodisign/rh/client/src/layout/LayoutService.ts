import { Injectable } from '@angular/core';
import { LayoutViewportService } from './LayoutViewportService';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor(
      readonly rootViewport: LayoutViewportService) {
  }

  readonly showMainContent = new BehaviorSubject<boolean>(false);


}

import { Injectable } from '@angular/core';
// import { Injector, SearchEvent, PersistenceService } from '@rh/core';
import { LayoutViewportService } from './LayoutViewportService';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LayoutSearchService {
  constructor(readonly viewport: LayoutViewportService) {
    // const persistence = Injector.inject(PersistenceService);
    //
    // persistence.search(new SearchEvent({
    //   queryString: 'colom*'
    // }));
  }

}

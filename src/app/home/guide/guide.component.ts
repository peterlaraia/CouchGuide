import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs/Observable';
import * as guideActions from './store/guide-actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'cg-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent implements OnInit {

  episodes$: Observable<Episode[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.episodes$ = this.store.select(fromRoot.guideEpisodes);
  }

  ngOnInit() {
    this.store.dispatch(new guideActions.FetchGuide({
      date: new Date(),
      country: 'US'
    }));
  }

}

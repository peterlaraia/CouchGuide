import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { ShowStatus } from '../enums/show-status';
import { Show } from '../models/show';
import { Episode } from '../models/episode';
import * as showActions from './store/show-actions';
import * as fromRoot from '../store/reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SslService } from '../core/ssl/ssl.service';

@Component({
  selector: 'cg-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss', './show.component.small.scss', './show.component.large.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowComponent implements OnInit, OnDestroy {

  show$: Observable<Show>;
  loading$: Observable<boolean>;
  loadingEpisode$: Observable<boolean>;
  upcomingEpisode$: Observable<Episode>;
  private showSub: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>, public sslService: SslService) {
    this.show$ = this.store.select(fromRoot.show);
    this.upcomingEpisode$ = this.store.select(fromRoot.upcomingEpisode);
    this.loading$ = this.store.select(fromRoot.loadingShow);
    this.loadingEpisode$ = this.store.select(fromRoot.loadingUpcomingEp);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new showActions.FetchShow(params['id']));
    });

    this.showSub = this.show$.subscribe((show: Show) => {
      if (show && show._links && show._links.nextepisode) {
        this.store.dispatch(new showActions.FetchEpisode(show._links.nextepisode.href));
      }
    });
  }

  ngOnDestroy() {
    if (this.showSub) {
      this.showSub.unsubscribe();
    }
  }

}

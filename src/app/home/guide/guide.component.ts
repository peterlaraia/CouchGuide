import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import * as guideActions from './store/guide-actions';
import * as fromRoot from '../../store/reducers';

type TvGuide = {[key: string]: Episode[]};

@Component({
  selector: 'cg-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent implements OnInit {

  episodeSub: Subscription;

  guide: TvGuide = {};
  networks: string[] = [];

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef) {
    this.episodeSub = this.store.select(fromRoot.guideEpisodes).do(this.filterNetworks).subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(new guideActions.FetchGuide({
      date: new Date(),
      country: 'US'
    }));
  }

  filterNetworks = (group: Episode[]): void => {
    this.guide = group.reduce((guide: TvGuide, ep: Episode) => {
      const network: string = ep && ep.show && ep.show.network && ep.show.network.name;
      if (network) {
        guide[network] = guide[network] ? [...(guide[network]), ep] : [ep];
      }
      return guide;
    }, {})

    this.networks = Object.keys(this.guide).sort();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.episodeSub.unsubscribe();
  }

}

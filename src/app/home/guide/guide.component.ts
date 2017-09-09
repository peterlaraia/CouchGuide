import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { ScheduleService } from "../../core/schedule/schedule.service";
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
  timesteps$: Observable<string[]>;

  guide: TvGuide = {};
  networks: string[] = [];

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef, private scheduleService: ScheduleService) {
    const now: Date = new Date();
    this.timesteps$ = this.store.select(fromRoot.guideTimeSteps);
    this.episodeSub = this.store.select(fromRoot.guideEpisodes)
      .do(this.filterNetworks)
      .do(() => this.store.dispatch(
        new guideActions.UpdateInterval(this.getIntervalSteps(`${now.getHours()}:${now.getMinutes()}`, 5)))
      )
      .subscribe();
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

  getIntervalSteps(base: string, numSteps: number): string[] {
    let minutes = this.scheduleService.timeStringToMinutes(base);
    if (minutes % 30 !== 0) {
      minutes = minutes + (30 - (minutes % 30));
    }

    const steps: string[] = [];
    for (let i = 0; i < numSteps; i++) {
      if (minutes >= 24 * 60) {
        minutes -= 24 * 60;
      }
      steps.push(this.scheduleService.buildTimeString(minutes))
      minutes += 30;
    }
    return steps;
  }

  ngOnDestroy(): void {
    this.episodeSub.unsubscribe();
  }

}

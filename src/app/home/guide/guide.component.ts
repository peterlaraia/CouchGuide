import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { ScheduleService } from "../../core/schedule/schedule.service";
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import * as guideActions from './store/guide-actions';
import { TvGuide } from './store/guide-reducer';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'cg-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent implements OnInit {

  timesteps$: Observable<string[]>;
  guide$: Observable<TvGuide>;
  networks$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef, private scheduleService: ScheduleService) {
    const now: Date = new Date();
    this.timesteps$ = this.store.select(fromRoot.guideTimeSteps);
    this.guide$ = this.store.select(fromRoot.guideEntity);
    this.networks$ = this.store.select(fromRoot.guideNetworks);
  }

  ngOnInit(): void {
    this.store.dispatch(new guideActions.FetchGuide({
      date: new Date(),
      country: 'US'
    }));
  }

  calculateCssLeft(base: string, airtime: string): number {
    const baseInMinutes: number = this.scheduleService.timeStringToMinutes(base);
    const airtimeInMinutes: number = this.scheduleService.timeStringToMinutes(airtime);
    const diff: number = airtimeInMinutes - baseInMinutes;
    const offset: number = diff/30;
    return offset * 20;
  }

  print = console.log

}

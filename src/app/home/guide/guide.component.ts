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

  private readonly SLOT_LENGTH_MINUTES: number = 30;
  private readonly SLOT_WIDTH_PCT: number = 20;

  timesteps$: Observable<Date[]>;
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

  calculateSlotLeft(base: Date, airstamp: string, runtime: number): number {
    const airDate: Date = new Date(airstamp);

    const diff: number = airDate.getTime() - base.getTime();
    const offset: number = diff/(this.SLOT_LENGTH_MINUTES*this.scheduleService.MILLIS_PER_MINUTE);
    return offset * this.SLOT_WIDTH_PCT;
  }

  calculateSlotWidth(runtime: number, airstamp: string, start: Date, end: Date): number {
    const airDate: Date = new Date(airstamp);
    const from: number = airDate.getTime();
    const to: number = 
      airDate.getTime() + runtime*this.scheduleService.MILLIS_PER_MINUTE
    return ((to-from)/(this.SLOT_LENGTH_MINUTES*this.scheduleService.MILLIS_PER_MINUTE)) * this.SLOT_WIDTH_PCT;
  }

  print = console.log

}

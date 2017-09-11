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

  calculateSlotLeft(base: string, airtime: string, runtime: number): number {
    const baseInMinutes: number = this.scheduleService.timeStringToMinutes(base);
    let airtimeInMinutes: number = this.scheduleService.timeStringToMinutes(airtime);
    if (airtimeInMinutes < baseInMinutes && airtimeInMinutes + runtime < baseInMinutes) {
      airtimeInMinutes += this.scheduleService.MINUTES_PER_DAY;
    }
    const diff: number = airtimeInMinutes - baseInMinutes;
    const offset: number = diff/this.SLOT_LENGTH_MINUTES;
    return offset * this.SLOT_WIDTH_PCT;
  }

  calculateSlotWidth(runtime: number, airtime: string, start: string): number {
    const airtimeMinutes: number = this.scheduleService.timeStringToMinutes(airtime); //1410
    const startMinutes: number = this.scheduleService.timeStringToMinutes(start);
    const endMinutes: number = startMinutes + this.SLOT_LENGTH_MINUTES*5;

    const from: number = Math.max(airtimeMinutes, startMinutes);
    const to: number = Math.min(endMinutes, airtimeMinutes + runtime);
    console.log(to-from, to, from, start, airtime, runtime);
    return ((to - from)/this.SLOT_LENGTH_MINUTES) * this.SLOT_WIDTH_PCT;
  }

  print = console.log

}

import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EpisodeService } from '../../../core/episode/episode.service';
import { ScheduleService } from '../../../core/schedule/schedule.service';
import * as guideActions from './guide-actions';
import { TvGuide } from "./guide-reducer";
import { Episode } from '../../../models/episode';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import * as fromRoot from '../../../store/reducers';

@Injectable()
export class GuideEffects {

    @Effect()
    fetchGuide: Observable<Action> = this.actions.ofType(guideActions.FETCH_GUIDE)
        .map((action: guideActions.FetchGuide) => action.payload)
        .switchMap((query: guideActions.Query) => this.episodeService.getSchedule(query.date, query.country))
        .map((episodes: Episode[]) => new guideActions.RetrievedGuide(episodes))
        .catch((err: Error) => Observable.of(new guideActions.RetrievedGuide([]))); // TODO handle error gracefully

    @Effect()
    retrievedGuide: Observable<Action> = this.actions.ofType(guideActions.RETRIEVED_GUIDE)
        .map((action: guideActions.RetrievedGuide) => action.payload)
        .map((episodes: Episode[]) => new guideActions.UpdateInterval(
            this.scheduleService.getIntervalSteps(new Date(), 5)
        ));

    @Effect()
    updateInterval: Observable<Action> = this.actions.ofType(guideActions.UPDATE_INTERVAL)
        .map((action: guideActions.UpdateInterval) => action.payload)
        //.map((timesteps: Date[]) => timesteps.map(this.scheduleService.timeStringToMinutes))
        .withLatestFrom(this.store.select(fromRoot.guideEpisodes))
        .map((guideInfo: any[]) => {
            const [timeSteps, episodes] = guideInfo;
            const filteredEpisodes: Episode[] = this.filterByTime(episodes, timeSteps[0], timeSteps[timeSteps.length - 1]);
            return new guideActions.BuildTvGuide(this.groupNetworks(filteredEpisodes))
        })


    constructor(
        private store: Store<fromRoot.State>,
        private actions: Actions,
        private episodeService: EpisodeService,
        private scheduleService: ScheduleService) { }

    filterByTime = (episodes: Episode[], start: Date, end: Date): Episode[] => {
        const filtered: Episode[] = episodes.filter((episode: Episode) => {
            const ep: Date = new Date(episode.airstamp);
            const epStart: number = ep.getTime();
            const epEnd: number = epStart + episode.runtime * this.scheduleService.MILLIS_PER_MINUTE;

            return (epStart >= start.getTime() && epStart < end.getTime()) || 
                (epEnd > start.getTime() && epEnd < end.getTime())
        });
        
        return filtered;
    }

    groupNetworks = (group: Episode[]): TvGuide => {
        return group.reduce((guide: TvGuide, ep: Episode) => {
            const network: string = ep && ep.show && ep.show.network && ep.show.network.name;
            if (network) {
                guide[network] = guide[network] ? [...(guide[network]), ep] : [ep];
            }
            return guide;
        }, {})
    }

}

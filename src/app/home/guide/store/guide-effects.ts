import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EpisodeService } from '../../../core/episode/episode.service';
import * as guideActions from './guide-actions';
import { Episode } from '../../../models/episode';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GuideEffects {

    @Effect()
    fetchGuide: Observable<Action> = this.actions.ofType(guideActions.FETCH_GUIDE)
        .map((action: guideActions.FetchGuide) => action.payload)
        .switchMap((query: guideActions.Query) => this.episodeService.getSchedule(query.date, query.country))
        .map((episodes: Episode[]) => new guideActions.RetrievedGuide(episodes))
        .catch((err: Error) => Observable.of(new guideActions.RetrievedGuide([]))); // TODO handle error gracefully

    constructor(private actions: Actions, private episodeService: EpisodeService) { }

}

import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EpisodeService } from '../../core/episode/episode.service';
import { Episode } from '../../models/episode';
import { Show } from '../../models/show';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ShowService } from '../services/show.service';
import * as showActions from './show-actions';

@Injectable()
export class ShowEffects {

    @Effect()
    fetchShow: Observable<Action> = this.actions.ofType(showActions.FETCH_SHOW)
        .map((action: showActions.FetchShow) => action.payload)
        .switchMap((id: number) => this.showService.getShow(id))
        .map((show: Show) => new showActions.RetrievedShow(show))
        .catch((err: Error) => Observable.of(new showActions.RetrievedShow(undefined))); // TODO handle error gracefully

    @Effect()
    fetchUpcomingEpisode: Observable<Action> = this.actions.ofType(showActions.FETCH_EP)
        .map((action: showActions.FetchEpisode) => action.payload)
        .switchMap((epLink: string) => this.episodeService.getEpisodeByUrl(epLink))
        .map((episode: Episode) => new showActions.RetrievedEpisode(episode))
        .catch((err: Error) => Observable.of(new showActions.RetrievedEpisode(undefined))); // TODO handle error gracefully

    constructor(private actions: Actions, private showService: ShowService, private episodeService: EpisodeService) { }

}

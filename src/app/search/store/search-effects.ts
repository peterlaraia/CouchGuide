import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Show } from '../../models/show';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as searchActions from './search-actions';
import { SearchService } from '../search.service';

@Injectable()
export class SearchEffects {

    @Effect()
    fetch: Observable<Action> = this.actions.ofType(searchActions.FETCH)
        .map((action: searchActions.Fetch) => action.payload)
        .switchMap((query: string) => this.searchService.search(query))
        .map((shows: Show[]) => new searchActions.Found(shows))
        .catch((err: Error) => Observable.of(new searchActions.Found([])));

    constructor(private actions: Actions, private searchService: SearchService) { }

}

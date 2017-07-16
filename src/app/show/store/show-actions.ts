import { Action } from '@ngrx/store';
import { Show } from '../../models/show';
import { Episode } from "../../models/episode";

export const FETCH_SHOW = '[Show] Fetch Show';
export const FETCH_EP = '[Show] Fetch Episode';
export const RETRIEVED_SHOW = '[Show] Retrieved Show';
export const RETRIEVED_EP = '[Show] Retrieved Episode';

export class FetchShow implements Action {
    readonly type = FETCH_SHOW;

    constructor(public payload: number) {}
}

export class RetrievedShow implements Action {
    readonly type = RETRIEVED_SHOW;

    constructor(public payload: Show) {}
}

export class FetchEpisode implements Action {
    readonly type = FETCH_EP;

    constructor(public payload: string) {}
}

export class RetrievedEpisode implements Action {
    readonly type = RETRIEVED_EP;

    constructor(public payload: Episode) {}
}

export type All = FetchShow | RetrievedShow | FetchEpisode | RetrievedEpisode;

import { Action } from '@ngrx/store';

import { TvGuide } from './guide-reducer';
import { Episode } from '../../../models/episode';

export const FETCH_GUIDE = '[Guide] Fetch Guide';
export const SET_EPISODES = '[Guide] Set Episodes';
export const APPEND_EPISODES = '[Guide] Append Episodes';
export const PREPEND_EPISODES = '[Guide] Prepend Episodes';
export const UPDATE_INTERVAL = '[Guide] Update Interval';
export const BUILD_TV_GUIDE = '[Guide] Build Guide';

export interface Query {
    date: Date;
    country: string;
    after: OnGuideFetch
}

export enum OnGuideFetch {
    APPEND,
    PREPEND,
    REPLACE
}

export class FetchGuide {
    readonly type = FETCH_GUIDE;

    constructor(public payload: Query) {
    }
}

export class UpdateInterval {
    readonly type = UPDATE_INTERVAL;

    constructor(public payload: Date[]) {
    }
}

export class SetEpisodes {
    readonly type = SET_EPISODES;

    constructor(public payload: Episode[]) {
    }
}

export class AppendEpisodes {
    readonly type = APPEND_EPISODES;

    constructor(public payload: Episode[]) {
    }
}

export class PrependEpisodes {
    readonly type = PREPEND_EPISODES;

    constructor(public payload: Episode[]) {
    }
}

export class BuildTvGuide {
    readonly type = BUILD_TV_GUIDE;

    constructor(public payload: TvGuide) {
    }
}

export type All = SetEpisodes | AppendEpisodes | PrependEpisodes | FetchGuide | UpdateInterval | BuildTvGuide;

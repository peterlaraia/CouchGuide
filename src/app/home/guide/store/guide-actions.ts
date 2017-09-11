import { Action } from '@ngrx/store';

import { TvGuide } from './guide-reducer';
import { Episode } from '../../../models/episode';

export const FETCH_GUIDE = '[Guide] Fetch Guide';
export const RETRIEVED_GUIDE = '[Guide] Retrieved Guide';
export const UPDATE_INTERVAL = '[Guide] Update Interval';
export const BUILD_TV_GUIDE = '[Guide] Build Guide';

export interface Query {
    date: Date;
    country: string;
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

export class RetrievedGuide {
    readonly type = RETRIEVED_GUIDE;

    constructor(public payload: Episode[]) {
    }
}

export class BuildTvGuide {
    readonly type = BUILD_TV_GUIDE;

    constructor(public payload: TvGuide) {
    }
}

export type All = RetrievedGuide | FetchGuide | UpdateInterval | BuildTvGuide;

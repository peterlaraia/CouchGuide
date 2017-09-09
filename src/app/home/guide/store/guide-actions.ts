import { Action } from '@ngrx/store';

import { Episode } from '../../../models/episode';

export const FETCH_GUIDE = '[Guide] Fetch Guide';
export const RETRIEVED_GUIDE = '[Guide] Retrieved Guide';
export const UPDATE_INTERVAL = '[Guide] Update Interval';

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

    constructor(public payload: string[]) {
    }
}

export class RetrievedGuide {
    readonly type = RETRIEVED_GUIDE;

    constructor(public payload: Episode[]) {
    }
}

export type All = RetrievedGuide | FetchGuide | UpdateInterval;

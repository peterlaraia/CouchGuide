import { Action } from '@ngrx/store';

import { Episode } from '../../../models/episode';

export const FETCH_GUIDE = '[Guide] Fetch Schedule';
export const RETRIEVED_GUIDE = '[Guide] Retrieved Schedule';

export interface Query {
    date: Date;
    country: string;
}

export class FetchGuide {
    readonly type = FETCH_GUIDE;

    constructor(public payload: Query) {
    }
}

export class RetrievedGuide {
    readonly type = RETRIEVED_GUIDE;

    constructor(public payload: Episode[]) {
    }
}

export type All = RetrievedGuide | FetchGuide;

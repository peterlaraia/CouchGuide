import { Action } from '@ngrx/store';
import { Show } from '../../models/show';

export const FETCH = '[Search] Fetch';
export const FOUND = '[Search] Found';

export class Fetch implements Action {
    readonly type = FETCH;

    constructor(public payload: string) {} // query
}

export class Found implements Action {
    readonly type = FOUND;

    constructor(public payload: Show[]) {}
}

export type All = Fetch | Found;

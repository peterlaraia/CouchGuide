import { Show } from '../../models/show';
import * as Actions from './search-actions';

export interface State {
    query: string;
    shows: Show[];
}

const initialState: State = {
    query: '',
    shows: []
};

export function reducer(state = initialState, action: Actions.All): State {
    switch (action.type) {
        case Actions.FETCH: {
            return {
                ...state,
                query: action.payload
            };
        }

        case Actions.FOUND: {
            return {
                ...state,
                shows: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

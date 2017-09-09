import * as Actions from './guide-actions';
import { Episode } from '../../../models/episode';

export interface State {
    loading: boolean;
    country: string;
    date: Date;
    episodes: Episode[];
    timeSteps: string[];
}

const initialState: State = {
    loading: false,
    country: 'US',
    date: new Date(),
    episodes: [],
    timeSteps: []
};

export function reducer(state = initialState, action: Actions.All) {
    switch (action.type) {
        case Actions.FETCH_GUIDE: {
            return {
                ...state,
                loading: true,
                date: action.payload.date,
                country: action.payload.country
            };
        }

        case Actions.UPDATE_INTERVAL: {
            return {
                ...state,
                timeSteps: action.payload
            }
        }

        case Actions.RETRIEVED_GUIDE: {
            return {
                ...state,
                loading: false,
                episodes: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

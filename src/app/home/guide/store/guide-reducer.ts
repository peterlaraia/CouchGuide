import * as Actions from './guide-actions';
import { Episode } from '../../../models/episode';

export type TvGuide = {[key: string]: Episode[]};

export interface State {
    loading: boolean;
    country: string;
    date: Date;
    episodes: Episode[];
    guide: TvGuide;
    networks: string[];
    timeSteps: Date[];
}

const initialState: State = {
    loading: false,
    country: 'US',
    date: new Date(),
    episodes: [],
    guide: {},
    networks: [],
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
            };
        }

        case Actions.BUILD_TV_GUIDE: {
            return {
                ...state,
                guide: action.payload,
                networks: Object.keys(action.payload)
            };
        }

        case Actions.SET_EPISODES: {
            return {
                ...state,
                loading: false,
                episodes: action.payload
            };
        }

        case Actions.APPEND_EPISODES: {
            return {
                ...state,
                loading: false,
                episodes: [...(state.episodes), ...(action.payload)]
            };
        }

        case Actions.PREPEND_EPISODES: {
            return {
                ...state,
                loading: false,
                episodes: [...(action.payload), ...(state.episodes)]
            };
        }

        default: {
            return state;
        }
    }
}
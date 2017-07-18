import { Show } from '../../models/show';
import * as Actions from './show-actions';
import { Episode } from 'app/models/episode';

export interface State {
    show: Show;
    nextEpisode: Episode;
    loadingShow: boolean;
    loadingEp: boolean;
}

const initialState: State = {
    show: undefined,
    nextEpisode: undefined,
    loadingShow: false,
    loadingEp: false
};

export function reducer(state = initialState, action: Actions.All): State {
    switch (action.type) {
        case Actions.FETCH_SHOW: {
            return {
                show: undefined,
                nextEpisode: undefined,
                loadingShow: true,
                loadingEp: false
            };
        }

        case Actions.RETRIEVED_SHOW: {
            return {
                ...state,
                show: action.payload,
                loadingShow: false
            };
        }

        case Actions.FETCH_EP: {
            return {
                ...state,
                loadingEp: true
            };
        }

        case Actions.RETRIEVED_EP: {
            return {
                ...state,
                nextEpisode: action.payload,
                loadingEp: false
            };
        }

        default: {
            return state;
        }
    }
}

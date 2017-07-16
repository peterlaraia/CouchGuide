import * as fromSearch from '../search/store/search-reducer';
import * as fromShow from '../show/store/show-reducer';

export interface State {
    search: fromSearch.State;
    show: fromShow.State;
}

export const reducers = {
    search: fromSearch.reducer,
    show: fromShow.reducer
};

/* Search Selectors */
export function searchQuery(state: State) {
    return state.search.query;
}

export function searchResults(state: State) {
    return state.search.shows;
}

/* Show Selectors */
export function loadingShow(state: State) {
    return state.show.loadingShow;
}

export function loadingUpcomingEp(state: State) {
    return state.show.loadingEp;
}

export function show(state: State) {
    return state.show.show;
}

export function upcomingEpisode(state: State) {
    return state.show.nextEpisode;
}

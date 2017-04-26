import * as fromSearch from '../search/store/search-reducer';

export interface State {
    search: fromSearch.State;
}

export const reducers = {
    search: fromSearch.reducer
};

/* Search Selectors */
export function searchQuery(state: State) {
    return state.search.query;
}

export function searchResults(state: State) {
    return state.search.shows;
}

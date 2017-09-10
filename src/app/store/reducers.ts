import * as fromGuide from '../home/guide/store/guide-reducer';
import * as fromSearch from '../search/store/search-reducer';
import * as fromShow from '../show/store/show-reducer';

export interface State {
    search: fromSearch.State;
    show: fromShow.State;
    guide: fromGuide.State;
}

export const reducers = {
    search: fromSearch.reducer,
    show: fromShow.reducer,
    guide: fromGuide.reducer
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

/* Guide Selectors */
export function guideLoading(state: State) {
    return state.guide.loading;
}

export function guideDate(state: State) {
    return state.guide.date;
}

export function guideCountry(state: State) {
    return state.guide.country;
}

export function guideEpisodes(state: State) {
    return state.guide.episodes;
}

export function guideEntity(state: State) {
    return state.guide.guide;
}

export function guideNetworks(state: State) {
    return state.guide.networks;
}

export function guideTimeSteps(state: State) {
    return state.guide.timeSteps;
}
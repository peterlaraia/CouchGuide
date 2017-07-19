import * as actions from './show-actions';
import { reducer } from './show-reducer';

describe('Show Reducer', () => {
    describe('on Fetch Show', () => {
        it('should update the state with a new show', () => {
            const state = {show: undefined, nextEpisode: undefined, loadingShow: false, loadingEp: false};
            const newState = reducer(state, new actions.FetchShow(1));
            expect(newState).toEqual({
                ...state, loadingShow: true
            });
        });
    });

    describe('on Retrieved Show', () => {
        it('should update the state with a new show', () => {
            const state = {show: undefined, nextEpisode: undefined, loadingShow: true, loadingEp: false};
            const newState = reducer(state, new actions.RetrievedShow({id: 1, name: 'tv-show'}));
            expect(newState).toEqual({
                ...state,
                show: {id: 1, name: 'tv-show'}, loadingShow: false
            });
        });
    });

    describe('on Fetch Episode', () => {
        it('should fetch the next episode for show', () => {
            const state = {show: {id: 1, _links: <any>{nextEpisode: 'url'}}, nextEpisode: undefined, loadingShow: false, loadingEp: false};
            const newState = reducer(state, new actions.FetchEpisode('url'));
            expect(newState).toEqual({
                ...state, loadingEp: true
            });
        });
    });

    describe('on Retrieved Episode', () => {
        it('should update the state with the next episode for show', () => {
            const state = {
                show: {
                    id: 1,
                    _links: <any>{
                        nextEpisode: 'url'
                    }
                },
                nextEpisode: undefined, loadingShow: false, loadingEp: true
            };
            const newState = reducer(state, new actions.RetrievedEpisode({id: 1000, name: 'episode'}));
            expect(newState).toEqual({
                ...state, nextEpisode: {id: 1000, name: 'episode'}, loadingEp: false
            });
        });
    });
});

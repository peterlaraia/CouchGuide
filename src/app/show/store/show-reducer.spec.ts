import * as actions from './show-actions';
import { reducer } from './show-reducer';

describe('Show Reducer', () => {
    describe('on Fetch', () => {
        it('should update the state with a new query', () => {
            const state = {query: '', shows: []};
            const newState = reducer(state, new actions.Fetch('query'));
            expect(newState).toEqual({query: 'query', shows: []});
        });
    });

    describe('on Found', () => {
        it('should update the state with a new set of shows', () => {
            const state = {query: '', shows: []};
            const newState = reducer(state, new actions.Found([{id: 1}]));
            expect(newState).toEqual({query: '', shows: [{id: 1}]});
        });
    });

    it('should return the current state if no matching action', () => {
        const state = {query: '', shows: []};
        const newState = reducer(state, <any>{type: undefined});
        expect(newState).toEqual(state);
    });
});

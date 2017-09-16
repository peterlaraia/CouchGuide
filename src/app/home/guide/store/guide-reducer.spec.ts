import * as actions from './guide-actions';
import { State, reducer } from './guide-reducer';

describe('Guide Reducer', () => {
    describe('on Fetch Guide', () => {
        it('should update the state with fetching in progress', () => {
            const prevState: State = {
                loading: false,
                date: undefined,
                country: undefined,
                episodes: []
            };
            const newState: State = reducer(prevState, new actions.FetchGuide({
                date: new Date('2017-08-21'),
                country: 'DE'
            }));
            expect(newState).toEqual({
                ...prevState, loading: true, date: new Date('2017-08-21'), country: 'DE'
            });
        });
    });

    describe('on Retrieved Guide', () => {
        it('should update the state after retrieving complete', () => {
            const prevState: State = {
                loading: true,
                date: new Date('2018-09-19'),
                country: 'KR',
                episodes: []
            };
            const newState = reducer(prevState, new actions.SetEpisodes([
                {id: 1, name: 'ep1'}, {id: 2, name: 'ep2'}
            ]));
            expect(newState).toEqual({
                ...prevState, loading: false, episodes: [
                    {id: 1, name: 'ep1'}, {id: 2, name: 'ep2'}
                ]
            });
        });
    });
});

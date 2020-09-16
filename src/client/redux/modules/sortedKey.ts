import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export type Key = 'id' | 'duedate' | 'status' | 'projectId';

export const changeKey = actionCreator<Key>('CHANGE_KEY');

const reducer = reducerWithInitialState('id').case(
	changeKey,
	(_state, payload) => {
		return payload;
	},
);

export default reducer;

export const selectSortedKey = createSelector(
	[(state: RootState) => state.sortedKey],
	(sortedKey) => sortedKey,
);

import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleProjectFormIsShown = actionCreator<boolean>(
	'toogle_projectFormIsShown',
);

const reducer = reducerWithInitialState(false).case(
	toggleProjectFormIsShown,
	(_state, payload) => {
		return payload;
	},
);

export default reducer;

export const selectProjectFormIsShown = createSelector(
	[(state: RootState) => state.projectFormIsShown],
	(projectFormIsShown) => projectFormIsShown,
);

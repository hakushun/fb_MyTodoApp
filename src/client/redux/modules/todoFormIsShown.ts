import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const toggleTodoFormIsShown = actionCreator<boolean>(
	'toogle_todoFormIsShown',
);

const reducer = reducerWithInitialState(false).case(
	toggleTodoFormIsShown,
	(_state, payload) => {
		return payload;
	},
);

export default reducer;

export const selectTodoFormIsShown = createSelector(
	[(state: RootState) => state.todoFormIsShown],
	(todoFormIsShown) => todoFormIsShown,
);

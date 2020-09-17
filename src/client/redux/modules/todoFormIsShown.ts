import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';
import { addTodo, updateTodo } from './todos';
import { editTodo, resetTodo } from './todo';

const actionCreator = actionCreatorFactory();

export const toggleTodoFormIsShown = actionCreator<boolean>(
	'toogle_todoFormIsShown',
);

const reducer = reducerWithInitialState(false)
	.case(toggleTodoFormIsShown, (_state, payload) => {
		toggleAriaHidden(payload);
		toggleScrollLock(payload);
		return payload;
	})
	.case(addTodo, () => {
		toggleAriaHidden(false);
		toggleScrollLock(false);
		return false;
	})
	.case(editTodo, () => {
		toggleAriaHidden(true);
		toggleScrollLock(true);
		return true;
	})
	.case(updateTodo, () => {
		toggleAriaHidden(false);
		toggleScrollLock(false);
		return false;
	})
	.case(resetTodo, () => {
		toggleAriaHidden(false);
		toggleScrollLock(false);
		return false;
	});

export default reducer;

export const selectTodoFormIsShown = createSelector(
	[(state: RootState) => state.todoFormIsShown],
	(todoFormIsShown) => todoFormIsShown,
);

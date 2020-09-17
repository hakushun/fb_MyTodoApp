import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { getToday } from '../../libs/utilFunctions';
import { addTodo, Todo, updateTodo } from './todos';

const actionCreator = actionCreatorFactory();

type ChangeTodo = {
	key: string;
	value: string | number;
};

export const changeTodo = actionCreator<ChangeTodo>('CHANGE_TODO');
export const resetTodo = actionCreator('RESET_TODO');
export const editTodo = actionCreator<Todo>('EDIT_TODO');

const initialState: Todo = {
	id: 0,
	title: '',
	dueDate: getToday(),
	status: 'new',
	projectId: 0,
};

const reducer = reducerWithInitialState(initialState)
	.case(changeTodo, (state, payload) => {
		return { ...state, [payload.key]: payload.value };
	})
	.case(resetTodo, () => {
		return { ...initialState };
	})
	.case(editTodo, (state, payload) => {
		return { ...state, ...payload };
	})
	.case(addTodo, () => {
		return { ...initialState };
	})
	.case(updateTodo, () => {
		return { ...initialState };
	});

export default reducer;

export const selectTodo = createSelector(
	[(state: RootState) => state.todo],
	(todo) => todo,
);

import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { steps, StepAction } from 'redux-effects-steps';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import axios from 'axios';
import { saveTodos, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

const actionCreator = actionCreatorFactory();

export type Status = 'new' | 'in_progress' | 'reviewing' | 'complete';
export interface Todo {
	id: number;
	title: string;
	dueDate: string;
	status: Status;
	projectId: number;
}
interface Todos {
	isLoading: boolean;
	todos: Todo[];
}
type AddTodo = {
	title: string;
	dueDate: string;
	projectId: number;
	uid: string;
};
type DeleteTodo = {
	id: number;
	uid: string;
};
type UpdateTodo = {
	todo: Todo;
	uid: string;
};
type ChangeStatus = {
	id: number;
	status: Status;
	uid: string;
};
type DeleteTodosWithProject = {
	id: number;
	uid: string;
};

export const addTodo = actionCreator<AddTodo>('add_todo');
export const deleteTodo = actionCreator<DeleteTodo>('delete_todo');
export const updateTodo = actionCreator<UpdateTodo>('update_todo');
export const changeStatus = actionCreator<ChangeStatus>('change_status');
export const deleteTodosWithProject = actionCreator<DeleteTodosWithProject>(
	'delete_todos_with_project',
);
export const downloadTodosActions = actionCreator.async<
	{ uid: string },
	Todo[],
	Error
>('download_todos');
export const downloadTodos = (body: { uid: string }): StepAction =>
	steps(
		downloadTodosActions.started(body),
		() => axios.get(`/api/todos/${body.uid}`),
		[
			({ data }) => {
				const result = JSON.parse(data);
				return downloadTodosActions.done({ params: body, result });
			},
			({ response: { data } }) =>
				downloadTodosActions.failed({ params: body, error: data }),
		],
	);

const initialState: Todos = { isLoading: true, todos: [] };

const reducer = reducerWithInitialState(initialState)
	.case(addTodo, (state, payload) => {
		saveTodos(payload.uid, [
			...state.todos,
			{
				id: calculateId(state.todos),
				title: payload.title,
				dueDate: payload.dueDate,
				status: 'new',
				projectId: payload.projectId,
			},
		]);
		return {
			isLoading: false,
			todos: [
				...state.todos,
				{
					id: calculateId(state.todos),
					title: payload.title,
					dueDate: payload.dueDate,
					status: 'new',
					projectId: payload.projectId,
				},
			],
		};
	})
	.case(deleteTodo, (state, payload) => {
		saveTodos(
			payload.uid,
			state.todos.filter((todo) => todo.id !== payload.id),
		);
		return {
			isLoading: false,
			todos: state.todos.filter((todo) => todo.id !== payload.id),
		};
	})
	.case(updateTodo, (state, payload) => {
		const otherState = state.todos.filter(
			(todo) => todo.id !== payload.todo.id,
		);
		saveTodos(payload.uid, [...otherState, payload.todo]);
		return { isLoading: false, todos: [...otherState, payload.todo] };
	})
	.case(changeStatus, (state, payload) => {
		const targetTodo = state.todos.find((todo) => todo.id === payload.id);
		const otherTodos = state.todos.filter((todo) => todo.id !== payload.id);
		if (targetTodo) {
			saveTodos(payload.uid, [
				...otherTodos,
				{ ...targetTodo, status: payload.status },
			]);
			return {
				isLoading: false,
				todos: [...otherTodos, { ...targetTodo, status: payload.status }],
			};
		}
		return state;
	})
	.case(deleteTodosWithProject, (state, payload) => {
		saveTodos(
			payload.uid,
			state.todos.filter((todo) => todo.projectId !== payload.id),
		);
		return {
			isLoading: false,
			todos: state.todos.filter((todo) => todo.projectId !== payload.id),
		};
	})
	.case(downloadTodosActions.done, (_state, { result }) => {
		return { todos: [...result], isLoading: false };
	})
	.case(downloadTodosActions.failed, (state, { error }) => {
		console.log(error);
		return { ...state, isLoading: false };
	});

export default reducer;

export const selectTodos = createSelector(
	[(state: RootState) => state.todos],
	(todos) => todos.todos,
);

export const selectIsLoading = createSelector(
	[(state: RootState) => state.todos],
	(todos) => todos.isLoading,
);

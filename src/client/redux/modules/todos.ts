import { Reducer } from 'redux';
import axios from 'axios';
import { saveTodos, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

// action type
const add_todo = 'add_todo';
const delete_todo = 'delete_todo';
const update_todo = 'update_todo';
const change_status = 'change_status';
const set_todos = 'set_todos';
const delete_todos_with_project = 'delete_todos_with_project';

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
	type: 'add_todo';
	payload: { title: string; dueDate: string; projectId: number };
	uid: string;
};
type DeleteTodo = {
	type: 'delete_todo';
	payload: number;
	uid: string;
};
type UpdateTodo = {
	type: 'update_todo';
	payload: Todo;
	uid: string;
};
type ChangeStatus = {
	type: 'change_status';
	payload: { id: number; status: Status };
	uid: string;
};
type SetTodos = {
	type: 'set_todos';
	payload: Todo[];
};
type DeleteTodosWithProject = {
	type: 'delete_todos_with_project';
	payload: number;
	uid: string;
};

// action creator
export const addTodo = (
	title: string,
	dueDate: string,
	projectId: number,
	uid: string,
): AddTodo => {
	return { type: add_todo, payload: { title, dueDate, projectId }, uid };
};

export const deleteTodo = (id: number, uid: string): DeleteTodo => {
	return { type: delete_todo, payload: id, uid };
};

export const updateTodo = (todo: Todo, uid: string): UpdateTodo => {
	return { type: update_todo, payload: todo, uid };
};

export const changeStatus = (
	id: number,
	status: Status,
	uid: string,
): ChangeStatus => {
	return { type: change_status, payload: { id, status }, uid };
};

export const setTodos = (todos: Todo[]): SetTodos => {
	return { type: set_todos, payload: todos };
};
export const deleteTodosWithProject = (
	prjId: number,
	uid: string,
): DeleteTodosWithProject => {
	return { type: delete_todos_with_project, payload: prjId, uid };
};

export const downloadTodos = (uid: string) => {
	// ここの型定義が不明
	return async (dispatch: any) => {
		const res = await axios.get(`/api/todos/${uid}`);
		const todos = await JSON.parse(res.data);
		return dispatch(setTodos(todos));
	};
};

type Action =
	| AddTodo
	| DeleteTodo
	| UpdateTodo
	| ChangeStatus
	| SetTodos
	| DeleteTodosWithProject;

const initialState: Todos = { isLoading: true, todos: [] };

const todos: Reducer<Todos, Action> = (state = initialState, action): Todos => {
	switch (action.type) {
		case add_todo:
			if (!action.payload) return state;
			saveTodos(action.uid, [
				...state.todos,
				{
					id: calculateId(state.todos),
					title: action.payload.title,
					dueDate: action.payload.dueDate,
					status: 'new',
					projectId: action.payload.projectId,
				},
			]);
			return {
				isLoading: false,
				todos: [
					...state.todos,
					{
						id: calculateId(state.todos),
						title: action.payload.title,
						dueDate: action.payload.dueDate,
						status: 'new',
						projectId: action.payload.projectId,
					},
				],
			};

		case delete_todo:
			saveTodos(
				action.uid,
				state.todos.filter((todo) => todo.id !== action.payload),
			);
			return {
				isLoading: false,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case update_todo: {
			const otherState = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			);
			saveTodos(action.uid, [...otherState, action.payload]);
			return { isLoading: false, todos: [...otherState, action.payload] };
		}

		case change_status: {
			const targetTodo = state.todos.find(
				(todo) => todo.id === action.payload.id,
			);
			const otherTodos = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			);
			if (targetTodo) {
				saveTodos(action.uid, [
					...otherTodos,
					{ ...targetTodo, status: action.payload.status },
				]);
				return {
					isLoading: false,
					todos: [
						...otherTodos,
						{ ...targetTodo, status: action.payload.status },
					],
				};
			}
			return state;
		}

		case set_todos:
			return { isLoading: false, todos: [...action.payload] };

		case delete_todos_with_project:
			saveTodos(
				action.uid,
				state.todos.filter((todo) => todo.projectId !== action.payload),
			);
			return {
				isLoading: false,
				todos: state.todos.filter((todo) => todo.projectId !== action.payload),
			};

		default:
			return state;
	}
};

export default todos;

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducers';
import {
	addTodo,
	deleteTodo,
	updateTodo,
	changeStatus,
	Status as typeStatus,
	Todo as typeTodo,
} from '../../redux/modules/todos';
import TodoApp from './TodoApp';
import { toggleTodoFormIsShown } from '../../redux/modules/todoFormIsShown';
import {
	toggleAriaHidden,
	toggleScrollLock,
	statusToNumber,
} from '../../libs/utilFunctions';
import {
	changeTodo,
	editTodo,
	resetTodo,
	selectTodo,
} from '../../redux/modules/todo';
import { changeKey, selectSortedKey, Key } from '../../redux/modules/sortedKey';

type Props = {
	currentUser: firebase.User | null;
};

const Component: React.FC<Props> = React.memo(
	({ currentUser }): JSX.Element => {
		const dispatch = useDispatch();
		const todo = useSelector(selectTodo);
		const todos = useSelector((state: RootState) => state.todos.todos);
		const isLoading = useSelector((state: RootState) => state.todos.isLoading);
		const projects = useSelector((state: RootState) => state.projects.projects);
		const sortedKey = useSelector(selectSortedKey);
		const [localTodos, setLocalTodos] = useState<typeTodo[]>([...todos]);
		const [selectedPrjId, setSelectedPrjId] = useState<string>('0');

		/**
		 * 入力フォームを表示する関数
		 */
		const handleOpenForm = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				toggleAriaHidden('true');
				toggleScrollLock('true');
				dispatch(toggleTodoFormIsShown(true));
			},
			[],
		);

		/**
		 * inputへの入力内容を制御する関数
		 */
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>, key: string) => {
				dispatch(changeTodo({ key, value: e.target.value }));
			},
			[todo],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば登録する関数
		 */
		const handleSubmit = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (todo.projectId === 0) return;
				if (!todo.title) return;
				currentUser &&
					dispatch(
						addTodo(todo.title, todo.dueDate, todo.projectId, currentUser.uid),
					);
				dispatch(resetTodo());
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleTodoFormIsShown(false));
			},
			[todo, currentUser],
		);

		/**
		 * 該当のtodoを削除する関数
		 */
		const handleDeleteTodo = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: typeTodo) => {
				e.preventDefault();
				if (window.confirm(`本当に${item.title}を削除しますか？`)) {
					currentUser && dispatch(deleteTodo(item.id, currentUser.uid));
				}
			},
			[currentUser],
		);

		/**
		 * 該当のtodoを編集するためのformを表示する関数
		 */
		const handleEditTodo = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: typeTodo) => {
				e.preventDefault();
				dispatch(editTodo({ ...item }));
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleTodoFormIsShown(true));
			},
			[dispatch],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば内容を上書きする関数
		 */
		const handleUpdateTodo = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (!todo.title) return;
				currentUser && dispatch(updateTodo(todo, currentUser.uid));
				dispatch(resetTodo());
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleTodoFormIsShown(false));
			},
			[todo, currentUser],
		);

		/**
		 * inputへの入力内容を破棄する関数
		 */
		const handleCancelInput = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				dispatch(resetTodo());
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleTodoFormIsShown(false));
			},
			[dispatch],
		);

		/**
		 * todoのstatusを変更する関数
		 */
		const handleChangeStatus = useCallback(
			(item: typeTodo, status: typeStatus) => {
				currentUser && dispatch(changeStatus(item.id, status, currentUser.uid));
			},
			[currentUser],
		);

		/**
		 * projectの選択を制御する関数
		 */
		const handleSelectProject = useCallback(
			(projectId: string) => {
				const parsedId = parseInt(projectId);
				dispatch(changeTodo({ key: 'projectId', value: parsedId }));
			},
			[dispatch],
		);

		/**
		 * drag start
		 */
		const handleDragstart = useCallback((e: React.DragEvent<HTMLLIElement>) => {
			e.dataTransfer.setData('text/plain', (e.target as HTMLLIElement).id);
		}, []);

		/**
		 * drag over
		 */
		const handleDragover = useCallback(
			(e: React.DragEvent<HTMLUListElement>) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = 'move';
			},
			[],
		);

		/**
		 * dropしたエリアによってstatusを変更する関数
		 */
		const handleDrop = useCallback(
			(e: React.DragEvent<HTMLUListElement>) => {
				e.preventDefault();
				const data = e.dataTransfer.getData('text/plain');
				const id = parseInt(data.split('-')[1]);
				const targetTodo = todos.find((item) => item.id === id);
				if (targetTodo) {
					const targetArea = (e.currentTarget as HTMLUListElement).id;
					if (targetArea === 'new_list' && targetTodo?.status !== 'new') {
						handleChangeStatus(targetTodo, 'new');
						return;
					}
					if (
						targetArea === 'in_progress_list' &&
						targetTodo?.status !== 'in_progress'
					) {
						handleChangeStatus(targetTodo, 'in_progress');
						return;
					}
					if (
						targetArea === 'reviewing_list' &&
						targetTodo.status !== 'reviewing'
					) {
						handleChangeStatus(targetTodo, 'reviewing');
						return;
					}
					if (
						targetArea === 'complete_list' &&
						targetTodo.status !== 'complete'
					) {
						handleChangeStatus(targetTodo, 'complete');
						return;
					}
				}
				return;
			},
			[todos, handleChangeStatus],
		);

		/**
		 * todo listの表示順序を制御する関数
		 */
		const handleSort = useCallback(
			(key: Key) => {
				dispatch(changeKey(key));
				if (key === 'id') {
					setLocalTodos([...todos.sort((a, b) => (a.id < b.id ? -1 : 1))]);
					return;
				}
				if (key === 'duedate') {
					setLocalTodos([
						...todos.sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1)),
					]);
					return;
				}
				if (key === 'projectId') {
					setLocalTodos([
						...todos.sort((a, b) => (a.projectId < b.projectId ? -1 : 1)),
					]);
					return;
				}
				if (key === 'status') {
					const sortedTodos = todos.sort((a, b) => {
						const _a = statusToNumber(a.status);
						const _b = statusToNumber(b.status);
						return _a < _b ? -1 : 1;
					});
					setLocalTodos([...sortedTodos]);
					return;
				}
			},
			[todos],
		);

		/**
		 * projectの選択を制御する関数
		 */
		const handleListByProject = useCallback(
			(e: React.ChangeEvent<HTMLSelectElement>) => {
				setSelectedPrjId(e.target.value);
			},
			[setSelectedPrjId],
		);

		// 選択されたprojectのtodoのみを表示させる
		useEffect(() => {
			if (selectedPrjId === '0') {
				setLocalTodos([...todos]);
				return;
			}
			// 選択されたprojectのtodoのみをlocalTodosに格納
			setLocalTodos([
				...todos.filter((td) => td.projectId === parseInt(selectedPrjId)),
			]);
		}, [selectedPrjId, todos]);

		// todosに変更があってもソートの内容は保持されたまま表示される
		useEffect(() => {
			if (sortedKey === 'id') {
				handleSort('id');
				return;
			}
			if (sortedKey === 'duedate') {
				handleSort('duedate');
				return;
			}
			if (sortedKey === 'status') {
				handleSort('status');
				return;
			}
			if (sortedKey === 'projectId') {
				handleSort('projectId');
				return;
			}
		}, [sortedKey, todos]);

		return (
			<TodoApp
				isLoading={isLoading}
				localTodos={localTodos}
				projects={projects}
				todo={todo}
				selectedPrjId={selectedPrjId}
				handleOpenForm={handleOpenForm}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleDeleteTodo={handleDeleteTodo}
				handleEditTodo={handleEditTodo}
				handleUpdateTodo={handleUpdateTodo}
				handleCancelInput={handleCancelInput}
				handleChangeStatus={handleChangeStatus}
				handleSelectProject={handleSelectProject}
				handleDragstart={handleDragstart}
				handleDragover={handleDragover}
				handleDrop={handleDrop}
				handleSort={handleSort}
				handleListByProject={handleListByProject}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;

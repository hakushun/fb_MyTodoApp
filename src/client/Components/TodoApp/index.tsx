import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addTodo,
	deleteTodo,
	updateTodo,
	changeStatus,
	Status as typeStatus,
	Todo as typeTodo,
	selectIsLoading,
	selectFilteredTodos,
	selectCompleteTodos,
	selectInProgressTodos,
	selectNewTodos,
	selectReviewingTodos,
} from '../../redux/modules/todos';
import TodoApp from './TodoApp';
import { toggleTodoFormIsShown } from '../../redux/modules/todoFormIsShown';
import {
	changeTodo,
	editTodo,
	resetTodo,
	selectTodo,
} from '../../redux/modules/todo';
import { changeKey, Key } from '../../redux/modules/sortedKey';
import {
	changePrjId,
	selectSelectedPrjId,
} from '../../redux/modules/selectedPrjId';
import { selectProjects } from '../../redux/modules/projects';

type Props = {
	currentUser: firebase.User | null;
};

const Component: React.FC<Props> = React.memo(
	({ currentUser }): JSX.Element => {
		const dispatch = useDispatch();
		const todo = useSelector(selectTodo);
		const todos = useSelector(selectFilteredTodos);
		const newTodos = useSelector(selectNewTodos);
		const inProgressTodos = useSelector(selectInProgressTodos);
		const reviewingTodos = useSelector(selectReviewingTodos);
		const completeTodos = useSelector(selectCompleteTodos);
		const isLoading = useSelector(selectIsLoading);
		const projects = useSelector(selectProjects);
		const selectedPrjId = useSelector(selectSelectedPrjId);

		/**
		 * 入力フォームを表示する関数
		 */
		const handleOpenForm = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				dispatch(toggleTodoFormIsShown(true));
			},
			[dispatch],
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
						addTodo({
							title: todo.title,
							dueDate: todo.dueDate,
							projectId: todo.projectId,
							uid: currentUser.uid,
						}),
					);
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
					currentUser &&
						dispatch(deleteTodo({ id: item.id, uid: currentUser.uid }));
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
				currentUser && dispatch(updateTodo({ todo, uid: currentUser.uid }));
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
			},
			[dispatch],
		);

		/**
		 * todoのstatusを変更する関数
		 */
		const handleChangeStatus = useCallback(
			(item: typeTodo, status: typeStatus) => {
				currentUser &&
					dispatch(changeStatus({ id: item.id, status, uid: currentUser.uid }));
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
			},
			[dispatch],
		);

		/**
		 * projectの選択を制御する関数
		 */
		const handleListByProject = useCallback(
			(e: React.ChangeEvent<HTMLSelectElement>) => {
				dispatch(changePrjId(e.target.value));
			},
			[dispatch],
		);

		return (
			<TodoApp
				isLoading={isLoading}
				todos={todos}
				newTodos={newTodos}
				inProgressTodos={inProgressTodos}
				reviewingTodos={reviewingTodos}
				completeTodos={completeTodos}
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

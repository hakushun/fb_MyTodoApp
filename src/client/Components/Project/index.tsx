import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducers';
import {
	Project as typeProject,
	addProject,
	deleteProject,
	updateProject,
} from '../../redux/modules/projects';
import Project from './Project';
import {
	deleteTodosWithProject,
	Todo as typeTodo,
} from '../../redux/modules/todos';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';
import {
	changeProject,
	editProject,
	selectProject,
} from '../../redux/modules/project';

type Props = {
	currentUser: firebase.User | null;
};

const Component: React.FC<Props> = React.memo(
	({ currentUser }): JSX.Element => {
		const dispatch = useDispatch();
		const isLoading = useSelector(
			(state: RootState) => state.projects.isLoading,
		);
		const project = useSelector(selectProject);
		const projects = useSelector((state: RootState) => state.projects.projects);
		const todos = useSelector((state: RootState) => state.todos.todos);
		// const initialProject = { id: 0, title: '', isComplete: false };

		/**
		 * inputへの入力内容を制御する関数
		 */
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(changeProject(e.target.value));
			},
			[project],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば登録する関数
		 */
		const handleSubmit = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (!project.title) return;
				currentUser && dispatch(addProject(project.title, currentUser.uid));
				dispatch(changeProject(''));
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[currentUser, project],
		);

		/**
		 * 該当のprojectを削除する関数
		 */
		const handleDelete = useCallback(
			(
				e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
				prjct: typeProject,
			) => {
				e.preventDefault();
				if (window.confirm(`本当に${prjct.title}を削除しますか？`)) {
					currentUser && dispatch(deleteProject(prjct.id, currentUser.uid));
					currentUser &&
						dispatch(deleteTodosWithProject(prjct.id, currentUser.uid));
				}
			},
			[currentUser],
		);

		/**
		 * 該当のprojectを編集するためのformを表示する関数
		 */
		const handleEdit = useCallback(
			(
				e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
				prjct: typeProject,
			) => {
				e.preventDefault();
				dispatch(editProject(prjct));
				toggleAriaHidden('true');
				toggleScrollLock('true');
				dispatch(toggleProjectFormIsShown(true));
			},
			[dispatch],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば内容を上書きする関数
		 */
		const handleUpdate = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (!project.title) return;
				currentUser && dispatch(updateProject(project, currentUser.uid));
				dispatch(changeProject(''));
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[currentUser, project],
		);

		/**
		 * inputへの入力内容を破棄する関数
		 */
		const handleCancelInput = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				dispatch(changeProject(''));
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[dispatch],
		);

		/**
		 * 引数のtodosが全て完了済みかを判断する関数
		 */
		const isTodosComplete = useCallback((items: typeTodo[]) => {
			if (items.length === 0) return false;
			return items.every((item) => item.status === 'complete');
		}, []);

		return (
			<Project
				projects={projects}
				isLoading={isLoading}
				todos={todos}
				currentUser={currentUser}
				project={project}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				handleUpdate={handleUpdate}
				handleCancelInput={handleCancelInput}
				isTodosComplete={isTodosComplete}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;

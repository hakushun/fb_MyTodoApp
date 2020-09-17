import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Project as typeProject,
	addProject,
	deleteProject,
	updateProject,
	selectIsLoading,
	selectCompleteProjects,
	selectIncompleteProjects,
	toggleComplete,
} from '../../redux/modules/projects';
import Project from './Project';
import { selectTodos } from '../../redux/modules/todos';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
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
		const isLoading = useSelector(selectIsLoading);
		const project = useSelector(selectProject);
		const incompleteProjects = useSelector(selectIncompleteProjects);
		const completeProjects = useSelector(selectCompleteProjects);
		const todos = useSelector(selectTodos);

		const mounted = useRef(false);
		useEffect(() => {
			// 全てのtodoが完了済みのprojectを完了済みにする
			if (completeProjects.length > 0) {
				completeProjects.forEach(
					(prjct) =>
						currentUser &&
						dispatch(
							toggleComplete({
								id: prjct.id,
								status: true,
								uid: currentUser.uid,
							}),
						),
				);
			}

			// 全てのtodoが完了済みでないのprojectを未完了にする
			if (incompleteProjects.length > 0) {
				incompleteProjects.forEach(
					(prjct) =>
						currentUser &&
						dispatch(
							toggleComplete({
								id: prjct.id,
								status: false,
								uid: currentUser.uid,
							}),
						),
				);
			}
			mounted.current = true;
		}, [todos]);

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
				currentUser &&
					dispatch(addProject({ title: project.title, uid: currentUser.uid }));
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
					currentUser &&
						dispatch(deleteProject({ id: prjct.id, uid: currentUser.uid }));
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
				currentUser &&
					dispatch(updateProject({ project, uid: currentUser.uid }));
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
				dispatch(toggleProjectFormIsShown(false));
			},
			[dispatch],
		);

		return (
			<Project
				incompleteProjects={incompleteProjects}
				completeProjects={completeProjects}
				isLoading={isLoading}
				project={project}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				handleUpdate={handleUpdate}
				handleCancelInput={handleCancelInput}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;

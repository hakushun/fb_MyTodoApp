import React from 'react';
import { Project as typeProject } from '../../redux/modules/projects';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { Todo as typeTodo } from '../../redux/modules/todos';
import { useSelector } from 'react-redux';
import { selectProjectFormIsShown } from '../../redux/modules/projectFormIsShown';

type Props = {
	projects: typeProject[];
	isLoading: boolean;
	todos: typeTodo[];
	currentUser: firebase.User | null;
	project: typeProject;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleDelete: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleEdit: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleCancelInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	isTodosComplete: (items: typeTodo[]) => boolean;
};

const Project: React.FC<Props> = React.memo(
	({
		projects,
		isLoading,
		todos,
		currentUser,
		project,
		handleChange,
		handleSubmit,
		handleDelete,
		handleEdit,
		handleUpdate,
		handleCancelInput,
		isTodosComplete,
	}) => {
		const projectFormIsShown = useSelector(selectProjectFormIsShown);

		return (
			<>
				{projectFormIsShown && (
					<ProjectForm
						project={project}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						handleUpdate={handleUpdate}
						handleCancelInput={handleCancelInput}
					/>
				)}
				<ProjectList
					projects={projects}
					isLoading={isLoading}
					todos={todos}
					currentUser={currentUser}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					isTodosComplete={isTodosComplete}
				/>
			</>
		);
	},
);

Project.displayName = 'Project';
export default Project;

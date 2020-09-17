import React from 'react';
import { Project as typeProject } from '../../redux/modules/projects';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { useSelector } from 'react-redux';
import { selectProjectFormIsShown } from '../../redux/modules/projectFormIsShown';

type Props = {
	incompleteProjects: typeProject[];
	completeProjects: typeProject[];
	isLoading: boolean;
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
};

const Project: React.FC<Props> = React.memo(
	({
		incompleteProjects,
		completeProjects,
		isLoading,
		project,
		handleChange,
		handleSubmit,
		handleDelete,
		handleEdit,
		handleUpdate,
		handleCancelInput,
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
					incompleteProjects={incompleteProjects}
					completeProjects={completeProjects}
					isLoading={isLoading}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			</>
		);
	},
);

Project.displayName = 'Project';
export default Project;

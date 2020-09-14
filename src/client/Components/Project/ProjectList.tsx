import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	Project as typeProject,
	toogleComplete,
} from '../../redux/modules/projects';
import { Todo as typeTodo } from '../../redux/modules/todos';
import styled from 'styled-components';
import Section from '../Common/Section/Section';
import Heading2 from '../Common/Heading/Heading2';
import Heading3 from '../Common/Heading/Heading3';
import TernaryButton from '../Common/Buttons/TernaryButton';
import Loading from '../Common/Loading/Bouncing';

const Card = styled.div`
	background: #fff;
	border: 1px solid #ccc6af;
	border-radius: 10px;
	box-shadow: 0 9px 4px -5px rgba(0, 0, 0, 0.8);
	margin: 20px auto 0;
	max-width: 800px;
	min-height: 90px;
	padding: 10px 15px;

	@media (max-width: 560px) {
		width: 100%;
	}
`;
const List = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;
const Item = styled.li`
	align-items: center;
	background: #dbeeff;
	border: 1px solid #ccc6af;
	border-radius: 20px;
	display: flex;
	margin-left: 10px;
	margin-top: 5px;
	max-width: 45%;
	padding: 5px 8px;

	@media (max-width: 560px) {
		display: flex;
		flex-direction: column;
	}
`;
const CompleteItem = styled(Item)`
	background: #f6f6f6;
`;
const Span = styled.span`
	max-width: 60%;
	overflow: hidden;
	padding: 0 5px;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (max-width: 560px) {
		max-width: 100%;
	}
`;
type Props = {
	projects: typeProject[];
	isLoading: boolean;
	todos: typeTodo[];
	currentUser: firebase.User | null;
	handleDelete: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleEdit: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	isTodosComplete: (items: typeTodo[]) => boolean;
};

const ProjectList: React.FC<Props> = React.memo(
	({
		projects,
		isLoading,
		todos,
		currentUser,
		handleDelete,
		handleEdit,
		isTodosComplete,
	}) => {
		const dispatch = useDispatch();

		const mounted = useRef(false);
		// ２回目のレンダリング以降に発火
		useEffect(() => {
			if (mounted.current) {
				// 全てのtodoが完了済みのprojectを格納
				const completeProjects = projects.filter((prjct) =>
					isTodosComplete(todos.filter((td) => prjct.id === td.projectId)),
				);

				// 全てのtodoが完了済みでないprojectを格納
				const incompleteProjects = projects.filter(
					(prjct) =>
						!isTodosComplete(todos.filter((td) => prjct.id === td.projectId)),
				);

				// 該当のprojectがなければreturn
				if (completeProjects.length === 0 && incompleteProjects.length === 0)
					return;

				// 全てのtodoが完了済みのprojectを完了済みにする
				if (completeProjects.length > 0) {
					completeProjects.forEach(
						(prjct) =>
							currentUser &&
							dispatch(toogleComplete(prjct.id, true, currentUser.uid)),
					);
				}

				// 全てのtodoが完了済みでないのprojectを未完了にする
				if (incompleteProjects.length > 0) {
					incompleteProjects.forEach(
						(prjct) =>
							currentUser &&
							dispatch(toogleComplete(prjct.id, false, currentUser.uid)),
					);
				}
				return;
			}
			mounted.current = true;
		}, [todos]);

		return (
			<Section id="project_list" ariahidden={false}>
				<Heading2 text="Project List" />
				{isLoading ? (
					<Loading />
				) : (
					<>
						<Card>
							<Heading3 text="Working Project" />
							<List id="incomplete_project_list">
								{projects
									.filter((prj) => prj.isComplete === false)
									.map((prj) => {
										return (
											<Item key={prj.id}>
												<Span>{prj.title}</Span>
												<div>
													<TernaryButton
														text="Edit"
														method={(e) => handleEdit(e, prj)}
													/>
													<TernaryButton
														text="Delete"
														method={(e) => handleDelete(e, prj)}
													/>
												</div>
											</Item>
										);
									})}
							</List>
						</Card>
						<Card>
							<Heading3 text="Complete Project" />
							<List id="complete_project_list">
								{projects
									.filter((prj) => prj.isComplete === true)
									.map((prj) => {
										return (
											<CompleteItem key={prj.id}>
												<Span>{prj.title}</Span>
												<div>
													<TernaryButton
														disabled={true}
														text="Edit"
														method={(e) => handleEdit(e, prj)}
													/>
													<TernaryButton
														text="Delete"
														method={(e) => handleDelete(e, prj)}
													/>
												</div>
											</CompleteItem>
										);
									})}
							</List>
						</Card>
					</>
				)}
			</Section>
		);
	},
);

ProjectList.displayName = 'ProjectList';
export default ProjectList;

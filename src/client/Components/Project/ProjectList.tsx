import React from 'react';
import { Project as typeProject } from '../../redux/modules/projects';
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
	incompleteProjects: typeProject[];
	completeProjects: typeProject[];
	isLoading: boolean;
	handleDelete: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleEdit: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
};

const ProjectList: React.FC<Props> = React.memo(
	({
		incompleteProjects,
		completeProjects,
		isLoading,
		handleDelete,
		handleEdit,
	}) => {
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
								{incompleteProjects.map((prj) => {
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
								{completeProjects.map((prj) => {
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

import React from 'react';
import { Project as typeProject } from '../../redux/modules/projects';
import styled from 'styled-components';
import Heading2 from '../Common/Heading/Heading2';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import Modal from '../Common/Modal/Modal';

const FormWrapper = styled.form`
	padding: 10px 0;
	text-align: center;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
const Label = styled.label`
	display: block;
	font-size: 18px;
	font-weight: bold;
	padding: 10px 0;
`;
const InpuWrapper = styled.div`
	padding: 10px 0;
`;
const Input = styled.input`
	border: 2px solid #ccc6af;
	border-radius: 3px;
	display: inline-block;
	font-size: 16px;
	min-height: 22px;
	min-width: 300px;
	padding: 5px 10px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
	}
`;

type Props = {
	project: typeProject;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleCancelInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
};

const ProjectForm: React.FC<Props> = React.memo(
	({
		project,
		handleChange,
		handleSubmit,
		handleUpdate,
		handleCancelInput,
	}) => {
		return (
			<Modal id="project_form" ariahidden="false">
				{project.id === 0 ? (
					<Heading2 text="Register Project" />
				) : (
					<Heading2 text="Update Project" />
				)}
				<FormWrapper>
					<fieldset>
						<Legend>
							<Label htmlFor="project_title_form">Project Title</Label>
						</Legend>
						<InpuWrapper>
							<Input
								id="project_title_form"
								type="text"
								autoFocus
								required
								aria-required="true"
								maxLength={30}
								value={project.title}
								onChange={(e) => handleChange(e)}
							/>
						</InpuWrapper>
					</fieldset>
					{project.id === 0 ? (
						<ButtonWrapper>
							<PrimaryButton text="Register" method={(e) => handleSubmit(e)} />
						</ButtonWrapper>
					) : (
						<ButtonWrapper>
							<PrimaryButton text="Update" method={(e) => handleUpdate(e)} />
						</ButtonWrapper>
					)}
					<ButtonWrapper>
						<SecondaryButton
							text="Cancel"
							method={(e) => handleCancelInput(e)}
						/>
					</ButtonWrapper>
				</FormWrapper>
			</Modal>
		);
	},
);

ProjectForm.displayName = 'ProjectForm';
export default ProjectForm;

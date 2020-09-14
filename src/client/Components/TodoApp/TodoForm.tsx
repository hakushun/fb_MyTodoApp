import React from 'react';
import { Todo as typeTodo } from '../../redux/modules/todos';
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
`;
const InpuWrapper = styled.div`
	padding: 10px 0;
`;
const Input = styled.input`
	border: 2px solid #ccc6af;
	border-radius: 3px;
	display: inline-block;
	font-size: 16px;
	padding: 5px 10px;
	width: 300px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
	}
`;
const Wrapper = styled.div`
	padding: 10px 0;
`;
const Selectbox = styled.select`
	background-color: #fff;
	border: 2px solid #ccc6af;
	border-radius: 3px;
	font-size: 16px;
	padding: 5px 10px;
	width: 300px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
	}
`;
type Props = {
	projects: typeProject[];
	todo: typeTodo;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleUpdateTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleCancelInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleSelectProject: (projectId: string) => void;
};

const TodoForm: React.FC<Props> = React.memo(
	({
		projects,
		todo,
		handleChange,
		handleSubmit,
		handleUpdateTodo,
		handleCancelInput,
		handleSelectProject,
	}): JSX.Element => {
		return (
			<Modal id="todo_form" ariahidden={false}>
				{todo.id === 0 ? (
					<Heading2 text="Register Todo" />
				) : (
					<Heading2 text="Update Todo" />
				)}
				<FormWrapper>
					<Wrapper>
						<fieldset>
							<Legend>
								<Label htmlFor="select_project">Project Title</Label>
							</Legend>
							<InpuWrapper>
								<Selectbox
									id="select_project"
									required
									aria-required="true"
									autoFocus
									value={todo.projectId}
									onChange={(e) => handleSelectProject(e.target.value)}>
									<option value="0">選択してください</option>
									{projects.map((prjct) => {
										return (
											<option key={prjct.id} value={prjct.id}>
												{prjct.title}
											</option>
										);
									})}
								</Selectbox>
							</InpuWrapper>
						</fieldset>
					</Wrapper>
					<Wrapper>
						<fieldset>
							<Legend>
								<Label htmlFor="todo_form_title">Todo Title</Label>
							</Legend>
							<InpuWrapper>
								<Input
									id="todo_form_title"
									required
									aria-required="true"
									maxLength={30}
									value={todo.title}
									type="text"
									onChange={(e) => {
										handleChange(e, 'title');
									}}
								/>
							</InpuWrapper>
						</fieldset>
					</Wrapper>
					<Wrapper>
						<fieldset>
							<Legend>
								<Label htmlFor="todo_fomr_dueDate">Duedate</Label>
							</Legend>
							<InpuWrapper>
								<Input
									id="todo_fomr_dueDate"
									required
									aria-required="true"
									value={todo.dueDate}
									type="date"
									onChange={(e) => {
										handleChange(e, 'dueDate');
									}}
								/>
							</InpuWrapper>
						</fieldset>
					</Wrapper>
					{todo.id === 0 ? (
						<ButtonWrapper>
							<PrimaryButton
								text="Register"
								method={(e) => {
									handleSubmit(e);
								}}
							/>
						</ButtonWrapper>
					) : (
						<ButtonWrapper>
							<PrimaryButton
								text="Update"
								method={(e) => {
									handleUpdateTodo(e);
								}}
							/>
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

TodoForm.displayName = 'TodoForm';
export default TodoForm;

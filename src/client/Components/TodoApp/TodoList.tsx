import React, { useState } from 'react';
import { Status, Todo as typeTodo } from '../../redux/modules/todos';
import TodoBoardView from './TodoBoardView';
import TodoTableView from './TodoTableView';
import { Project as typeProject } from '../../redux/modules/projects';
import styled from 'styled-components';
import Section from '../Common/Section/Section';
import Heading2 from '../Common/Heading/Heading2';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import Loading from '../Common/Loading/Bouncing';
import { Key } from '../../redux/modules/sortedKey';

const Selectbox = styled.select`
	background-color: #fff;
	border: 2px solid #ccc6af;
	border-radius: 3px;
	font-size: 16px;
	padding: 5px 10px;
	width: 150px;
`;
const OperationWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 10px auto 0;
	max-width: 800px;
`;
const SelectInner = styled.div`
	padding: 5px 0;
`;
const Label = styled.label`
	display: inline-block;
	font-size: 16px;
	font-weight: bold;
`;
const InnerWrapper = styled.div`
	text-align: left;
`;
type Props = {
	isLoading: boolean;
	todos: typeTodo[];
	newTodos: typeTodo[];
	inProgressTodos: typeTodo[];
	reviewingTodos: typeTodo[];
	completeTodos: typeTodo[];
	projects: typeProject[];
	selectedPrjId: string;
	handleOpenForm: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleDeleteTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleEditTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleChangeStatus: (item: typeTodo, status: Status) => void;
	handleDragstart: (e: React.DragEvent<HTMLLIElement>) => void;
	handleDragover: (e: React.DragEvent<HTMLUListElement>) => void;
	handleDrop: (e: React.DragEvent<HTMLUListElement>) => void;
	handleSort: (key: Key) => void;
	handleListByProject: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TodoList: React.FC<Props> = React.memo(
	({
		isLoading,
		todos,
		newTodos,
		inProgressTodos,
		reviewingTodos,
		completeTodos,
		projects,
		selectedPrjId,
		handleOpenForm,
		handleDeleteTodo,
		handleEditTodo,
		handleChangeStatus,
		handleDragstart,
		handleDragover,
		handleDrop,
		handleSort,
		handleListByProject,
	}): JSX.Element => {
		const [view, setView] = useState<'table' | 'board'>('table');
		return (
			<Section id="todo_list" ariahidden={false}>
				<Heading2 text="Todo List" />
				<OperationWrapper>
					<InnerWrapper>
						<SelectInner>
							<Label htmlFor="view_select_project">Slelct Project: </Label>
							<Selectbox
								id="view_select_project"
								value={selectedPrjId}
								onChange={(e) => {
									handleListByProject(e);
								}}>
								<option value="0">All</option>
								{projects.map((prjct) => {
									return (
										<option key={prjct.id} value={prjct.id}>
											{prjct.title}
										</option>
									);
								})}
							</Selectbox>
						</SelectInner>
						<SelectInner>
							<Label htmlFor="view_select">Slelct View: </Label>
							<Selectbox
								id="view_select"
								onChange={(e) => {
									setView(e.target.value as 'table' | 'board');
								}}>
								<option value="table">Table View</option>
								<option value="board">Board View</option>
							</Selectbox>
						</SelectInner>
					</InnerWrapper>
					<ButtonWrapper>
						<PrimaryButton
							text="Create Todo"
							method={(e) => handleOpenForm(e)}
						/>
					</ButtonWrapper>
				</OperationWrapper>
				{isLoading ? (
					<Loading />
				) : (
					<>
						{view === 'table' ? (
							<TodoTableView
								todos={todos}
								projects={projects}
								handleEditTodo={handleEditTodo}
								handleDeleteTodo={handleDeleteTodo}
								handleChangeStatus={handleChangeStatus}
								handleSort={handleSort}
							/>
						) : (
							<TodoBoardView
								newTodos={newTodos}
								inProgressTodos={inProgressTodos}
								reviewingTodos={reviewingTodos}
								completeTodos={completeTodos}
								handleEditTodo={handleEditTodo}
								handleDeleteTodo={handleDeleteTodo}
								handleDragstart={handleDragstart}
								handleDragover={handleDragover}
								handleDrop={handleDrop}
							/>
						)}
					</>
				)}
			</Section>
		);
	},
);

TodoList.displayName = 'TodoList';
export default TodoList;

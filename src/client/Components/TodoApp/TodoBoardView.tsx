import React from 'react';
import { Todo as typeTodo } from '../../redux/modules/todos';
import Todo from './Todo';
import styled from 'styled-components';
import Heading3 from '../Common/Heading/Heading3';

const GridWrapper = styled.div`
	display: grid;
	gap: 0 20px;
	grid-template-areas:
		'new new'
		'in_progress reviewing'
		'complete complete';
`;
const NewWrapper = styled.div`
	background: #fff;
	border: 1px solid #ccc6af;
	border-radius: 10px;
	box-shadow: 0 9px 4px -5px rgba(0, 0, 0, 0.8);
	grid-area: new;
	margin-top: 20px;
	padding: 10px 15px;
`;
const InProgressWrapper = styled.div`
	background: #fff;
	border: 1px solid #ccc6af;
	border-radius: 10px;
	box-shadow: 0 9px 4px -5px rgba(0, 0, 0, 0.8);
	grid-area: in_progress;
	margin-top: 20px;
	padding: 10px 15px;
`;
const ReviewingWrapper = styled.div`
	background: #fff;
	border: 1px solid #ccc6af;
	border-radius: 10px;
	box-shadow: 0 9px 4px -5px rgba(0, 0, 0, 0.8);
	grid-area: reviewing;
	margin-top: 20px;
	padding: 10px 15px;
`;
const CompleteWrapper = styled.div`
	background: #fff;
	border: 1px solid #ccc6af;
	border-radius: 10px;
	box-shadow: 0 9px 4px -5px rgba(0, 0, 0, 0.8);
	grid-area: complete;
	margin-top: 20px;
	padding: 10px 15px;

	& li {
		background: #f6f6f6;
	}
`;
const Droparea = styled.ul`
	display: flex;
	flex-wrap: wrap;
	min-height: 100px;
`;
type Props = {
	localTodos: typeTodo[];
	handleDeleteTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleEditTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleDragstart: (e: React.DragEvent<HTMLLIElement>) => void;
	handleDragover: (e: React.DragEvent<HTMLUListElement>) => void;
	handleDrop: (e: React.DragEvent<HTMLUListElement>) => void;
};

const TodoBoardView: React.FC<Props> = React.memo(
	({
		localTodos,
		handleDeleteTodo,
		handleEditTodo,
		handleDragstart,
		handleDragover,
		handleDrop,
	}): JSX.Element => {
		const newTodos = localTodos.filter((item) => item.status === 'new');
		const inProgressTodos = localTodos.filter(
			(item) => item.status === 'in_progress',
		);
		const reviewingTodos = localTodos.filter(
			(item) => item.status === 'reviewing',
		);
		const completeTodos = localTodos.filter(
			(item) => item.status === 'complete',
		);

		return (
			<GridWrapper id="todo_list_board">
				<NewWrapper>
					<Heading3 text="New" />
					<Droparea
						id="new_list"
						onDragOver={(e) => handleDragover(e)}
						onDrop={(e) => handleDrop(e)}>
						<Todo
							todos={newTodos}
							handleEditTodo={handleEditTodo}
							handleDeleteTodo={handleDeleteTodo}
							handleDragstart={handleDragstart}
						/>
					</Droparea>
				</NewWrapper>
				<InProgressWrapper>
					<Heading3 text="Work in progress" />
					<Droparea
						id="in_progress_list"
						onDragOver={(e) => handleDragover(e)}
						onDrop={(e) => handleDrop(e)}>
						<Todo
							todos={inProgressTodos}
							handleEditTodo={handleEditTodo}
							handleDeleteTodo={handleDeleteTodo}
							handleDragstart={handleDragstart}
						/>
					</Droparea>
				</InProgressWrapper>
				<ReviewingWrapper>
					<Heading3 text="Reviewing" />
					<Droparea
						id="reviewing_list"
						onDragOver={(e) => handleDragover(e)}
						onDrop={(e) => handleDrop(e)}>
						<Todo
							todos={reviewingTodos}
							handleEditTodo={handleEditTodo}
							handleDeleteTodo={handleDeleteTodo}
							handleDragstart={handleDragstart}
						/>
					</Droparea>
				</ReviewingWrapper>
				<CompleteWrapper>
					<Heading3 text="Complete" />
					<Droparea
						id="complete_list"
						onDragOver={(e) => handleDragover(e)}
						onDrop={(e) => handleDrop(e)}>
						<Todo
							todos={completeTodos}
							handleEditTodo={handleEditTodo}
							handleDeleteTodo={handleDeleteTodo}
							handleDragstart={handleDragstart}
						/>
					</Droparea>
				</CompleteWrapper>
			</GridWrapper>
		);
	},
);

TodoBoardView.displayName = 'TodoBoardView';
export default TodoBoardView;

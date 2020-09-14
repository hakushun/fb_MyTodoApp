import React from 'react';
import { Todo as typeTodo } from '../../redux/modules/todos';
import styled from 'styled-components';
import TernaryButton from '../Common/Buttons/TernaryButton';

const TodoItem = styled.li`
	align-items: center;
	background: #ffdbf4;
	border: 1px solid #ccc6af;
	border-radius: 20px;
	cursor: pointer;
	display: flex;
	height: 100%;
	margin-left: 10px;
	margin-top: 5px;
	padding: 5px 8px;

	@media (max-width: 560px) {
		flex-direction: column;
	}
`;
const Span = styled.span`
	padding: 0 5px;
`;
type Props = {
	todos: typeTodo[];
	handleDeleteTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleEditTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleDragstart: (e: React.DragEvent<HTMLLIElement>) => void;
};

const Todo: React.FC<Props> = React.memo(
	({
		todos,
		handleDeleteTodo,
		handleEditTodo,
		handleDragstart,
	}): JSX.Element => {
		return (
			<>
				{todos.map((item) => {
					return (
						<TodoItem
							key={`todo-${item.id}`}
							id={`todo-${item.id}`}
							draggable="true"
							onDragStart={(e) => handleDragstart(e)}>
							<Span>{item.title}</Span>
							<Span>{item.dueDate}</Span>
							<div>
								<TernaryButton
									disabled={item.status === 'complete'}
									text="Edit"
									method={(e) => handleEditTodo(e, item)}
								/>
								<TernaryButton
									text="Delete"
									method={(e) => handleDeleteTodo(e, item)}
								/>
							</div>
						</TodoItem>
					);
				})}
			</>
		);
	},
);

Todo.displayName = 'Todo';
export default Todo;

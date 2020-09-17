import React from 'react';
import { Status, Todo as typeTodo } from '../../redux/modules/todos';
import { Project as typeProject } from '../../redux/modules/projects';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useSelector } from 'react-redux';
import { selectTodoFormIsShown } from '../../redux/modules/todoFormIsShown';
import { Key } from '../../redux/modules/sortedKey';

type Props = {
	isLoading: boolean;
	todos: typeTodo[];
	newTodos: typeTodo[];
	inProgressTodos: typeTodo[];
	reviewingTodos: typeTodo[];
	completeTodos: typeTodo[];
	projects: typeProject[];
	todo: typeTodo;
	selectedPrjId: string;
	handleOpenForm: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleDeleteTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleEditTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleUpdateTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleCancelInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	handleChangeStatus: (item: typeTodo, status: Status) => void;
	handleSelectProject: (projectId: string) => void;
	handleDragstart: (e: React.DragEvent<HTMLLIElement>) => void;
	handleDragover: (e: React.DragEvent<HTMLUListElement>) => void;
	handleDrop: (e: React.DragEvent<HTMLUListElement>) => void;
	handleSort: (key: Key) => void;
	handleListByProject: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TodoApp: React.FC<Props> = React.memo(
	({
		isLoading,
		todos,
		newTodos,
		inProgressTodos,
		reviewingTodos,
		completeTodos,
		projects,
		todo,
		selectedPrjId,
		handleOpenForm,
		handleChange,
		handleSubmit,
		handleDeleteTodo,
		handleEditTodo,
		handleUpdateTodo,
		handleCancelInput,
		handleChangeStatus,
		handleSelectProject,
		handleDragstart,
		handleDragover,
		handleDrop,
		handleSort,
		handleListByProject,
	}): JSX.Element => {
		const todoFormIsShown = useSelector(selectTodoFormIsShown);

		return (
			<>
				{projects.length > 0 && (
					<>
						{todoFormIsShown && (
							<TodoForm
								projects={projects}
								todo={todo}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								handleUpdateTodo={handleUpdateTodo}
								handleCancelInput={handleCancelInput}
								handleSelectProject={handleSelectProject}
							/>
						)}
						<TodoList
							isLoading={isLoading}
							todos={todos}
							newTodos={newTodos}
							inProgressTodos={inProgressTodos}
							reviewingTodos={reviewingTodos}
							completeTodos={completeTodos}
							projects={projects}
							selectedPrjId={selectedPrjId}
							handleOpenForm={handleOpenForm}
							handleEditTodo={handleEditTodo}
							handleDeleteTodo={handleDeleteTodo}
							handleChangeStatus={handleChangeStatus}
							handleDragstart={handleDragstart}
							handleDragover={handleDragover}
							handleDrop={handleDrop}
							handleSort={handleSort}
							handleListByProject={handleListByProject}
						/>
					</>
				)}
			</>
		);
	},
);

TodoApp.displayName = 'TodoApp';
export default TodoApp;

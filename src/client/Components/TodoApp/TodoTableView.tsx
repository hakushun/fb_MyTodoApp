import React from 'react';
import { Status, Todo as typeTodo } from '../../redux/modules/todos';
import { Project as typeProject } from '../../redux/modules/projects';
import styled from 'styled-components';
import TernaryButton from '../Common/Buttons/TernaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import { Key } from '../../redux/modules/sortedKey';

const TableWrapper = styled.div`
	margin-top: 20px;
	overflow-x: auto;
	padding-bottom: 10px;
`;
const Table = styled.table`
	margin: 0 auto;
	max-width: 800px;
	min-width: 700px;
`;
const Th = styled.th`
	background: #dbfff8;
	font-size: 18px;
	font-weight: bold;
	padding: 5px 10px;
	vertical-align: middle;
`;
const Td = styled.td`
	border-bottom: 1px solid #666358;
	max-width: 190px;
	padding: 5px 10px;
	text-align: center;
	vertical-align: middle;
`;
const Selectbox = styled.select`
	background-color: #fff;
	border: 2px solid #ccc6af;
	border-radius: 3px;
	font-size: 16px;
	padding: 3px;
`;
type Props = {
	todos: typeTodo[];
	projects: typeProject[];
	handleDeleteTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleEditTodo: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		item: typeTodo,
	) => void;
	handleChangeStatus: (item: typeTodo, status: Status) => void;
	handleSort: (key: Key) => void;
};

const TodoTableView: React.FC<Props> = React.memo(
	({
		todos,
		projects,
		handleDeleteTodo,
		handleEditTodo,
		handleChangeStatus,
		handleSort,
	}): JSX.Element => {
		return (
			<TableWrapper id="todo_list_table">
				<Table>
					<thead>
						<tr>
							<Th>
								<QuaternaryButton text="ID" method={() => handleSort('id')} />
							</Th>
							<Th>
								<QuaternaryButton
									text="Project"
									method={() => handleSort('projectId')}
								/>
							</Th>
							<Th>Title</Th>
							<Th>
								<QuaternaryButton
									text="Duedate"
									method={() => handleSort('duedate')}
								/>
							</Th>
							<Th>
								<QuaternaryButton
									text="Status"
									method={() => handleSort('status')}
								/>
							</Th>
							<Th>Action</Th>
						</tr>
					</thead>
					<tbody>
						{todos.map((item) => {
							const targetPrj = projects.find((p) => {
								return p.id === item.projectId;
							});
							return (
								<tr key={`todo-${item.id}`} id={`todo-${item.id}`}>
									<Td>{item.id}</Td>
									<Td>{targetPrj && targetPrj.title}</Td>
									<Td>{item.title}</Td>
									<Td>{item.dueDate}</Td>
									<Td>
										<Selectbox
											value={item.status}
											onChange={(e) => {
												return handleChangeStatus(
													item,
													e.target.value as Status,
												);
											}}>
											<option value="new">New</option>
											<option value="in_progress">Working</option>
											<option value="reviewing">Reviewing</option>
											<option value="complete">Complete</option>
										</Selectbox>
									</Td>
									<Td>
										<TernaryButton
											disabled={item.status === 'complete'}
											text="Edit"
											method={(e) => handleEditTodo(e, item)}
										/>
										<TernaryButton
											text="Delete"
											method={(e) => handleDeleteTodo(e, item)}
										/>
									</Td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</TableWrapper>
		);
	},
);

TodoTableView.displayName = 'TodoTableView';
export default TodoTableView;

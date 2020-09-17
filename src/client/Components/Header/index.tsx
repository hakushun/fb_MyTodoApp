import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
import { useDispatch } from 'react-redux';
import { selectTodalTodos, selectTodayTodos } from '../../redux/modules/todos';

type Props = {
	currentUser: firebase.User | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
};

const Component: React.FC<Props> = React.memo(
	({ currentUser, setCurrentUser }): JSX.Element => {
		const dispatch = useDispatch();
		const totalTodos = useSelector(selectTodalTodos);
		const todayTodos = useSelector(selectTodayTodos);

		/**
		 * project formを表示する関数
		 */
		const handleOpenForm = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				dispatch(toggleProjectFormIsShown(true));
			},
			[],
		);

		return (
			<Header
				totalTodos={totalTodos}
				todayTodos={todayTodos}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				handleOpenForm={handleOpenForm}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;

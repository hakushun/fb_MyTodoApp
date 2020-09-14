import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducers';
import Header from './Header';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
import { useDispatch } from 'react-redux';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';

type Props = {
	currentUser: firebase.User | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
};

const Component: React.FC<Props> = React.memo(
	({ currentUser, setCurrentUser }): JSX.Element => {
		const dispatch = useDispatch();
		const todos = useSelector((state: RootState) => state.todos.todos);

		/**
		 * project formを表示する関数
		 */
		const handleOpenForm = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				toggleAriaHidden('true');
				toggleScrollLock('true');
				dispatch(toggleProjectFormIsShown(true));
			},
			[],
		);

		return (
			<Header
				todos={todos}
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				handleOpenForm={handleOpenForm}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;

import React, { useEffect } from 'react';
import { auth } from '../../libs/firebase';
import Project from '../Project';
import TodoApp from '../TodoApp';
import { downloadTodos } from '../../redux/modules/todos';
import { downloadProjects } from '../../redux/modules/projects';
import { useDispatch, useSelector } from 'react-redux';
import * as H from 'history';
import ModalCover from '../Common/Modal/ModalCover';
import { RootState } from '../../redux/modules/reducers';

type Props = {
	history: H.History;
	currentUser: firebase.User | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
};

const home: React.FC<Props> = React.memo(
	({ history, currentUser, setCurrentUser }) => {
		const dispatch = useDispatch();
		const projectFormIsShown = useSelector(
			(state: RootState) => state.projectFormIsShown,
		);
		const todoFormIsShown = useSelector(
			(state: RootState) => state.todoFormIsShown,
		);

		// login済みであればfirestoreからデータを取得しlocal stateに格納
		// 未loginであればlogin formに遷移
		useEffect(() => {
			auth.onAuthStateChanged((user) => {
				if (user) {
					setCurrentUser(user);
					dispatch(downloadTodos(user.uid));
					dispatch(downloadProjects(user.uid));
					return;
				}
				history.push('/login');
			});
		}, []);

		return (
			<>
				<main>
					<Project currentUser={currentUser} />
					<TodoApp currentUser={currentUser} />
				</main>
				{(projectFormIsShown || todoFormIsShown) && <ModalCover />}
			</>
		);
	},
);

home.displayName = 'home';
export default home;

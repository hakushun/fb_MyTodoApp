import { combineReducers } from 'redux';
import todo from './todo';
import todos from './todos';
import project from './project';
import projects from './projects';
import projectFormIsShown from './projectFormIsShown';
import todoFormIsShown from './todoFormIsShown';

// 複数のreducerを一つにまとめる
const rootReducer = combineReducers({
	todo,
	todos,
	project,
	projects,
	projectFormIsShown,
	todoFormIsShown,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

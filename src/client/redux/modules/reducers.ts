import { combineReducers } from 'redux';
import todos from './todos';
import projects from './projects';
import projectFormIsShown from './projectFormIsShown';
import todoFormIsShown from './todoFormIsShown';

// 複数のreducerを一つにまとめる
const rootReducer = combineReducers({
	todos,
	projects,
	projectFormIsShown,
	todoFormIsShown,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

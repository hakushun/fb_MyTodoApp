import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { addProject, Project, updateProject } from './projects';

const actionCreator = actionCreatorFactory();

export const changeProject = actionCreator<string>('CHANGE_PROJECT');
export const editProject = actionCreator<Project>('EDIT_PROJECT');

const initialState = {
	id: 0,
	title: '',
	isComplete: false,
};

const reducer = reducerWithInitialState(initialState)
	.case(changeProject, (state, payload) => {
		return { ...state, title: payload };
	})
	.case(editProject, (state, payload) => {
		return { ...state, ...payload };
	})
	.case(addProject, () => initialState)
	.case(updateProject, () => initialState);

export default reducer;

export const selectProject = createSelector(
	[(state: RootState) => state.project],
	(project) => ({
		id: project.id,
		title: project.title,
		isComplete: project.isComplete,
	}),
);

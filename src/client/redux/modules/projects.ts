import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { steps, StepAction } from 'redux-effects-steps';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import axios from 'axios';
import { savesProjects, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

const actionCreator = actionCreatorFactory();

export interface Project {
	id: number;
	title: string;
	isComplete: boolean;
}
interface Projects {
	isLoading: boolean;
	projects: Project[];
}

type AddProject = {
	title: string;
	uid: string;
};
type DeleteProject = {
	id: number;
	uid: string;
};
type UpdateProject = {
	project: Project;
	uid: string;
};
type ToggleComplete = {
	id: number;
	status: boolean;
	uid: string;
};

export const addProject = actionCreator<AddProject>('add_project');
export const deleteProject = actionCreator<DeleteProject>('delete_project');
export const updateProject = actionCreator<UpdateProject>('update_project');
export const toggleComplete = actionCreator<ToggleComplete>('toogle_complete');
export const downloadProjectsActions = actionCreator.async<
	{ uid: string },
	Project[],
	Error
>('download_projects');

export const downloadProjects = (body: { uid: string }): StepAction =>
	steps(
		downloadProjectsActions.started(body),
		() => axios.get(`/api/projects/${body.uid}`),
		[
			({ data }) => {
				const result = JSON.parse(data);
				return downloadProjectsActions.done({ params: body, result });
			},
			({ response: { data } }) =>
				downloadProjectsActions.failed({ params: body, error: data }),
		],
	);

const initialState: Projects = {
	isLoading: true,
	projects: [],
};

const reducer = reducerWithInitialState(initialState)
	.case(addProject, (state, payload) => {
		savesProjects(payload.uid, [
			...state.projects,
			{
				id: calculateId(state.projects),
				title: payload.title,
				isComplete: false,
			},
		]);
		return {
			isLoading: false,
			projects: [
				...state.projects,
				{
					id: calculateId(state.projects),
					title: payload.title,
					isComplete: false,
				},
			],
		};
	})
	.case(deleteProject, (state, payload) => {
		savesProjects(
			payload.uid,
			state.projects.filter((project) => project.id !== payload.id),
		);
		return {
			isLoading: false,
			projects: state.projects.filter((project) => project.id !== payload.id),
		};
	})
	.case(updateProject, (state, payload) => {
		const otherState = state.projects.filter(
			(project) => project.id !== payload.project.id,
		);
		savesProjects(payload.uid, [...otherState, payload.project]);
		return { isLoading: false, projects: [...otherState, payload.project] };
	})
	.case(toggleComplete, (state, payload) => {
		const targetProject = state.projects.find(
			(project) => project.id === payload.id,
		);
		const otherState = state.projects.filter(
			(project) => project.id !== payload.id,
		);
		if (targetProject) {
			savesProjects(payload.uid, [
				...otherState,
				{ ...targetProject, isComplete: payload.status },
			]);
			return {
				isLoading: false,
				projects: [
					...otherState,
					{ ...targetProject, isComplete: payload.status },
				],
			};
		}
		return state;
	})
	.case(downloadProjectsActions.done, (_state, { result }) => {
		return { projects: [...result], isLoading: false };
	})
	.case(downloadProjectsActions.failed, (state, { error }) => {
		console.log(error);
		return { ...state, isLoading: false };
	});

export default reducer;

export const selectProjects = createSelector(
	[(state: RootState) => state.projects],
	(projects) => projects.projects,
);

export const selectIsLoading = createSelector(
	[(state: RootState) => state.projects],
	(projects) => projects.isLoading,
);

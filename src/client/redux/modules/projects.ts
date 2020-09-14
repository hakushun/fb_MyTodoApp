import { Reducer } from 'redux';
import axios from 'axios';
import { savesProjects, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

// action type
const add_project = 'add_project';
const delete_project = 'delete_project';
const update_project = 'update_project';
const set_projects = 'set_projects';
const toggle_complete = 'toggle_complete';

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
	type: typeof add_project;
	payload: string;
	uid: string;
};
type DeleteProject = {
	type: typeof delete_project;
	payload: number;
	uid: string;
};
type UpdateProject = {
	type: typeof update_project;
	payload: Project;
	uid: string;
};
type SetProjects = {
	type: typeof set_projects;
	payload: Project[];
};
type ToggleComplete = {
	type: typeof toggle_complete;
	payload: { id: number; status: boolean };
	uid: string;
};

// action creator
export const addProject = (title: string, uid: string): AddProject => {
	return { type: add_project, payload: title, uid };
};
export const deleteProject = (id: number, uid: string): DeleteProject => {
	return { type: delete_project, payload: id, uid };
};
export const updateProject = (project: Project, uid: string): UpdateProject => {
	return { type: update_project, payload: project, uid };
};
export const setProjects = (projects: Project[]): SetProjects => {
	return { type: set_projects, payload: projects };
};
export const toogleComplete = (
	id: number,
	status: boolean,
	uid: string,
): ToggleComplete => {
	return { type: toggle_complete, payload: { id, status }, uid };
};

export const downloadProjects = (uid: string) => {
	// ここの型定義が不明
	return async (dispatch: any) => {
		const res = await axios.get(`/api/projects/${uid}`);
		const projects = await JSON.parse(res.data);
		return dispatch(setProjects(projects));
	};
};

type Action =
	| AddProject
	| DeleteProject
	| UpdateProject
	| SetProjects
	| ToggleComplete;

const initialState: Projects = {
	isLoading: true,
	projects: [],
};

const projects: Reducer<Projects, Action> = (
	state = initialState,
	action,
): Projects => {
	switch (action.type) {
		case add_project:
			savesProjects(action.uid, [
				...state.projects,
				{
					id: calculateId(state.projects),
					title: action.payload,
					isComplete: false,
				},
			]);
			return {
				isLoading: false,
				projects: [
					...state.projects,
					{
						id: calculateId(state.projects),
						title: action.payload,
						isComplete: false,
					},
				],
			};

		case delete_project:
			savesProjects(
				action.uid,
				state.projects.filter((project) => project.id !== action.payload),
			);
			return {
				isLoading: false,
				projects: state.projects.filter(
					(project) => project.id !== action.payload,
				),
			};

		case update_project: {
			const otherState = state.projects.filter(
				(project) => project.id !== action.payload.id,
			);
			savesProjects(action.uid, [...otherState, action.payload]);
			return { isLoading: false, projects: [...otherState, action.payload] };
		}

		case set_projects:
			return { isLoading: false, projects: [...action.payload] };

		case toggle_complete: {
			const targetProject = state.projects.find(
				(project) => project.id === action.payload.id,
			);
			const otherState = state.projects.filter(
				(project) => project.id !== action.payload.id,
			);
			if (targetProject) {
				savesProjects(action.uid, [
					...otherState,
					{ ...targetProject, isComplete: action.payload.status },
				]);
				return {
					isLoading: false,
					projects: [
						...otherState,
						{ ...targetProject, isComplete: action.payload.status },
					],
				};
			}
			return state;
		}

		default:
			return state;
	}
};

export default projects;

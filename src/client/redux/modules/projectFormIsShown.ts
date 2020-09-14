import { Reducer } from 'redux';

// action type
const toogle_projectFormIsShown = 'toogle_projectFormIsShown';

type ProjectFormIsShown = {
	type: typeof toogle_projectFormIsShown;
	payload: boolean;
};

// action creator
export const toggleProjectFormIsShown = (
	boolean: boolean,
): ProjectFormIsShown => {
	return { type: toogle_projectFormIsShown, payload: boolean };
};

type Action = ProjectFormIsShown;

const projectFormIsShown: Reducer<boolean, Action> = (
	state = false,
	action,
): boolean => {
	switch (action.type) {
		case toogle_projectFormIsShown:
			return action.payload;
		default:
			return state;
	}
};

export default projectFormIsShown;

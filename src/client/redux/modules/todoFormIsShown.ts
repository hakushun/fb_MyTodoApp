import { Reducer } from 'redux';

// action type
const toogle_todoFormIsShown = 'toogle_todoFormIsShown';

type TodoFormIsShown = {
	type: typeof toogle_todoFormIsShown;
	payload: boolean;
};

// action creator
export const toggleTodoFormIsShown = (boolean: boolean): TodoFormIsShown => {
	return { type: toogle_todoFormIsShown, payload: boolean };
};

type Action = TodoFormIsShown;

const todoFormIsShown: Reducer<boolean, Action> = (
	state = false,
	action,
): boolean => {
	switch (action.type) {
		case toogle_todoFormIsShown:
			return action.payload;
		default:
			return state;
	}
};

export default todoFormIsShown;

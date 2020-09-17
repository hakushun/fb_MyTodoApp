import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { addProject, updateProject } from './projects';
import { editProject } from './project';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';

const actionCreator = actionCreatorFactory();

export const toggleProjectFormIsShown = actionCreator<boolean>(
	'toogle_projectFormIsShown',
);

const reducer = reducerWithInitialState(false)
	.case(toggleProjectFormIsShown, (_state, payload) => {
		toggleAriaHidden(payload);
		toggleScrollLock(payload);
		return payload;
	})
	.case(addProject, () => {
		toggleAriaHidden(false);
		toggleScrollLock(false);
		return false;
	})
	.case(updateProject, () => {
		toggleAriaHidden(false);
		toggleScrollLock(false);
		return false;
	})
	.case(editProject, () => {
		toggleAriaHidden(true);
		toggleScrollLock(true);
		return true;
	});

export default reducer;

export const selectProjectFormIsShown = createSelector(
	[(state: RootState) => state.projectFormIsShown],
	(projectFormIsShown) => projectFormIsShown,
);

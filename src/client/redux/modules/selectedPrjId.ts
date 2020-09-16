import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export const changePrjId = actionCreator<string>('CHANGE_PRJID');

const reducer = reducerWithInitialState('0').case(
	changePrjId,
	(_state, payload) => {
		return payload;
	},
);

export default reducer;

export const selectSelectedPrjId = createSelector(
	[(state: RootState) => state.selectedPrjId],
	(selectedPrjId) => selectedPrjId,
);

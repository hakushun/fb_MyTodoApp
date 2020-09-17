import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules/reducers';
import stepsMiddleware from 'redux-effects-steps';

interface ExtendedWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare const window: ExtendedWindow;

const composeReduxDevToolsEnhancers =
	(typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(
	rootReducer,
	composeReduxDevToolsEnhancers(applyMiddleware(thunk, stepsMiddleware)),
);

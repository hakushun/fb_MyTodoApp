import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './libs/dnd-polyfill';
import React, { useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import SignUp from './Components/Pages/SignUp';
import Login from './Components/Pages/Login';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
	${reset}
	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	body {
		background-color: #fff8dc;
		color: #333;
		font-family: 'Noto Sans', 'Noto Sans JP', sans-serif;
	}
`;

const app = (): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<null | firebase.User>(null);

	return (
		<>
			<GlobalStyle />
			<Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
			<Router>
				<Route
					exact
					path="/"
					render={(props) => (
						<Home
							currentUser={currentUser}
							setCurrentUser={setCurrentUser}
							{...props}
						/>
					)}></Route>
				<Route exact path="/signup" component={SignUp}></Route>
				<Route exact path="/login" component={Login}></Route>
			</Router>
		</>
	);
};

export default app;

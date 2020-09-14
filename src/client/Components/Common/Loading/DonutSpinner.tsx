import React from 'react';
import styled, { keyframes } from 'styled-components';

const donutspin = keyframes`
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
`;
const DonutSpinner = styled.div`
	animation: ${donutspin} 1.2s linear infinite;
	border: 4px solid hsl(222, 100%, 95%);
	border-left-color: hsl(243, 80%, 62%);
	border-radius: 50%;
	display: inline-block;
	height: 30px;
	width: 30px;
`;

const donutSpinner = React.memo(
	(): JSX.Element => {
		return <DonutSpinner></DonutSpinner>;
	},
);

donutSpinner.displayName = 'donutSpinner';
export default donutSpinner;

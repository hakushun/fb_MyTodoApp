import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
	to {
		opacity: 0.1;
		transform: translate3d(0, -16px, 0);
	}
`;
const Loader = styled.div`
	align-items: center;
	display: flex;
	height: 180px;
	justify-content: center;

	&::before {
		animation: ${bounce} 0.6s infinite alternate;
		background: #5778f3;
		border-radius: 50%;
		content: ' ';
		display: inline-block;
		height: 13px;
		width: 13px;
	}

	&::after {
		animation: ${bounce} 0.6s infinite alternate;
		animation-delay: 0.4s;
		background: #5778f3;
		border-radius: 50%;
		content: ' ';
		display: inline-block;
		height: 13px;
		width: 13px;
	}
`;
const LoaderBoucing = styled.div`
	animation: ${bounce} 0.6s infinite alternate;
	animation-delay: 0.2s;
	background: #5778f3;
	border-radius: 50%;
	content: ' ';
	display: inline-block;
	height: 13px;
	margin: 0 5px;
	width: 13px;
`;

const bouncing = React.memo(
	(): JSX.Element => {
		return (
			<Loader>
				<LoaderBoucing></LoaderBoucing>
			</Loader>
		);
	},
);

bouncing.displayName = 'bouncing';
export default bouncing;

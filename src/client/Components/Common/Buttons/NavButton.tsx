import React from 'react';
import styled from 'styled-components';

const Nav = styled.button`
	background-color: #ffe6db;
	border: 2px solid #ffe6db;
	border-radius: 3px;
	box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
	color: #33322c;
	cursor: pointer;
	font-size: 18px;
	font-weight: bold;
	margin-left: 20px;
	outline: none;
	padding: 3px;

	&:hover {
		background-color: #fff;
	}

	&:focus {
		background-color: #fff;
	}

	&:active {
		box-shadow: none;
		transform: translateY(2px);
	}

	@media (max-width: 560px) {
		font-size: 14px;
		width: 80px;
	}
`;

type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const NavButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<Nav type="button" onClick={method}>
			{text}
		</Nav>
	);
});

NavButton.displayName = 'NavButton';
export default NavButton;

import React from 'react';
import styled from 'styled-components';

const Quaternary = styled.button`
	background-color: #ffe6db;
	border: 2px solid #ffe6db;
	border-radius: 3px;
	box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
	color: #33322c;
	cursor: pointer;
	font-size: 18px;
	font-weight: bold;
	outline: none;

	& + & {
		margin-left: 5px;
	}

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
`;

type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const QuaternaryButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<Quaternary type="button" onClick={method}>
			{text}
		</Quaternary>
	);
});

QuaternaryButton.displayName = 'QuaternaryButton';
export default QuaternaryButton;

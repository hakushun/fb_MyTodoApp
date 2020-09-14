import React from 'react';
import styled from 'styled-components';

const Ternary = styled.button`
	background-color: #dbffe6;
	border: 2px solid #dbffe6;
	border-radius: 3px;
	box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
	color: #33322c;
	cursor: pointer;
	font-size: 16px;
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

	&:disabled {
		background-color: #cdcdcd;
		border: 2px solid #cdcdcd;
		cursor: initial;
	}
`;

type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
	disabled?: boolean;
};

const TernaryButton: React.FC<Props> = React.memo(
	({ method, text, disabled }) => {
		return (
			<Ternary type="button" onClick={method} disabled={disabled}>
				{text}
			</Ternary>
		);
	},
);

TernaryButton.displayName = 'TernaryButton';
export default TernaryButton;

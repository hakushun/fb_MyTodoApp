import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
	background: #87cefa;
	border: solid 5px #009afa;
	border-radius: 5px;
	left: 50%;
	max-height: 90vh;
	overflow-y: auto;
	padding: 20px 15px;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 340px;
	z-index: 100;
`;

type Props = {
	children: React.ReactNode;
	id: string;
	ariahidden: boolean | 'true' | 'false';
};

const Modal: React.FC<Props> = React.memo(({ children, id, ariahidden }) => {
	return (
		<Wrapper id={id} aria-hidden={ariahidden}>
			{children}
		</Wrapper>
	);
});

Modal.displayName = 'Modal';
export default Modal;

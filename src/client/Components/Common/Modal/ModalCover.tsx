import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: #000;
	bottom: 0;
	left: 0;
	opacity: 0.8;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 10;
`;
const ModalCover = React.memo(
	(): JSX.Element => {
		return <Wrapper></Wrapper>;
	},
);

ModalCover.displayName = 'ModalCover';
export default ModalCover;

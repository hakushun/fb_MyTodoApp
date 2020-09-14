import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 10px 0;
`;
type Props = {
	children: React.ReactNode;
};

const ButtonWrapper: React.FC<Props> = React.memo((props) => {
	return <Wrapper>{props.children}</Wrapper>;
});

ButtonWrapper.displayName = 'ButtonWrapper';
export default ButtonWrapper;

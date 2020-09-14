import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	text-align: center;
`;
type Props = {
	children: React.ReactNode;
};

const HeadingWrapper: React.FC<Props> = React.memo(({ children }) => {
	return <Wrapper>{children}</Wrapper>;
});

HeadingWrapper.displayName = 'HeadingWrapper';
export default HeadingWrapper;

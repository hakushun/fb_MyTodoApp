import React from 'react';
import styled from 'styled-components';
import HeadingWrapper from './HeadingWrapper';

const Heading = styled.h2`
	font-size: 18px;
	font-weight: bold;
	padding: 5px 0;
`;
type Props = {
	text: string;
};

const Heading3: React.FC<Props> = React.memo(({ text }) => {
	return (
		<HeadingWrapper>
			<Heading>{text}</Heading>
		</HeadingWrapper>
	);
});

Heading3.displayName = 'Heading3';
export default Heading3;

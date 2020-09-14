import React from 'react';
import styled from 'styled-components';
import HeadingWrapper from './HeadingWrapper';

const Heading = styled.h2`
	border-bottom: 3px solid #fc0;
	display: inline-block;
	font-size: 22px;
	font-weight: bold;
	padding: 10px 5px;
`;
type Props = {
	text: string;
};

const Heading2: React.FC<Props> = React.memo(({ text }) => {
	return (
		<HeadingWrapper>
			<Heading>{text}</Heading>
		</HeadingWrapper>
	);
});

Heading2.displayName = 'Heading2';
export default Heading2;

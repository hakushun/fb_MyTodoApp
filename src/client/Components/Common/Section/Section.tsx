import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
	padding: 20px 16px;
	text-align: center;
`;
type Props = {
	children?: React.ReactNode;
	id: string;
	ariahidden: boolean | 'true' | 'false';
};

const Section: React.FC<Props> = React.memo(({ children, id, ariahidden }) => {
	return (
		<Wrapper id={id} aria-hidden={ariahidden}>
			{children}
		</Wrapper>
	);
});

Section.displayName = 'Section';
export default Section;

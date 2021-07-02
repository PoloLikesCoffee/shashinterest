import React from 'react';
import styled from 'styled-components';

const PinHistory = ({ urls, alt }) => {
	return (
		<Wrapper>
			<Container>
				<img src={urls?.regular} alt={alt} />
			</Container>
		</Wrapper>
	);
};

export default PinHistory;

const Wrapper = styled.div`
	display: inline-flex;
	padding: 0.5rem;
	margin-bottom: 1.4rem;
	position: relative;
`;

const Container = styled.div`
	display: flex;
	box-sizing: border-box;
	width: 100px;

	img {
		display: flex;
		width: 100%;
		border-radius: 16px;
		object-fit: cover;
		filter: brightness(80%);
	}
`;

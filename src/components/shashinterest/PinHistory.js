import React from 'react';
import styled from 'styled-components';

const PinHistory = ({ urls, alt, photographer, link, id }) => {
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
	// cursor: pointer;
	width: 100px;

	img {
		opacity: 1;
		display: flex;
		width: 100%;
		// cursor: pointer;
		border-radius: 16px;
		object-fit: cover;
		filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2));
	}

	// :hover > img {
	// 	opacity: 0.7;
	// }
`;

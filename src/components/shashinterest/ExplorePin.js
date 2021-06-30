import React from 'react';
import styled from 'styled-components';

const ExplorePin = ({ src, termName, id }) => {
	const capitalizeFirstLetter = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	return (
		<Wrapper>
			<Container>
				<img src={src} alt="Default source url" />
				<div className="term">{capitalizeFirstLetter(termName)}</div>
			</Container>
		</Wrapper>
	);
};

export default ExplorePin;

const Wrapper = styled.div`
	display: inline-flex;
	padding: 0.5rem;
	margin-bottom: 1.4rem;
	position: relative;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	cursor: pointer;
	width: 220px;
	height: 220px;

	img {
		opacity: 1;
		display: flex;
		width: 100%;
		height: 100%;
		cursor: zoom-in;
		cursor: pointer;
		border-radius: 25px;
		object-fit: cover;
		filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2));
	}

	.term {
		position: absolute;
		opacity: 1;
		font-size: 1.3rem;
		color: var(--color-white);
	}

	:hover > img {
		opacity: 0.7;
	}
`;

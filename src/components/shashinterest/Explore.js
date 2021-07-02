import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import ExplorePin from './ExplorePin';
import './Homeboard.css';

const Explore = () => {
	const [examplesPins, setExamplesPins] = useState([]);
	let examples = [
		{
			termName: 'holidays',
			src: 'https://source.unsplash.com/featured/?holidays',
			id: uniqid(),
		},
		{
			termName: 'animals',
			src: 'https://source.unsplash.com/featured/?animals',
			id: uniqid(),
		},
		{
			termName: 'diy',
			src: 'https://source.unsplash.com/featured/?diy',
			id: uniqid(),
		},
		{
			termName: 'travel',
			src: 'https://source.unsplash.com/featured/?travel',
			id: uniqid(),
		},
		{
			termName: 'quotes',
			src: 'https://source.unsplash.com/featured/?quotes',
			id: uniqid(),
		},
		{
			termName: 'art',
			src: 'https://source.unsplash.com/featured/?art',
			id: uniqid(),
		},
		{
			termName: 'design',
			src: 'https://source.unsplash.com/featured/?design',
			id: uniqid(),
		},
		{
			termName: 'tattoos',
			src: 'https://source.unsplash.com/featured/?tattoos',
			id: uniqid(),
		},
		{
			termName: 'drink',
			src: 'https://source.unsplash.com/featured/?drink',
			id: uniqid(),
		},
		{
			termName: 'craft',
			src: 'https://source.unsplash.com/featured/?craft',
			id: uniqid(),
		},
	];

	const setExplorePins = () => {
		setExamplesPins(examples);
	};

	useEffect(() => {
		setExplorePins();
	}, []);

	return (
		<Wrapper>
			<div className="title-explore">Explore Shashinterest</div>
			<Container className="board__container">
				{examplesPins.map((category) => {
					return (
						<ExplorePin
							key={category.id}
							src={category.src}
							termName={category.termName}
						/>
					);
				})}
			</Container>
		</Wrapper>
	);
};

export default Explore;

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 1rem;

	.title-explore {
		margin: 1rem 0;
		font-size: 2rem;
		width: fit-content;
		text-align: center;
		border-bottom: 2px solid var(--color-beige);
	}
`;

const Container = styled.div`
	column-gap: 0.6rem;
	margin: 0 auto;
	height: 100%;
`;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import ExplorePin from './ExplorePin';
import './Mainboard.css';

const Explore = () => {
	const [examplesPins, setExamplesPins] = useState([]);
	const defaultImgSrc =
		'https://images.unsplash.com/photo-1557683316-973673baf926?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80';
	let examples = [
		'holidays',
		'animals',
		'diy',
		'travel',
		'quotes',
		'art',
		'design',
		'tattoos',
		'drink',
		'craft',
	];

	const setExplorePins = () => {
		let array = [];
		examples.forEach((term) => {
			array.push({ termName: term, src: defaultImgSrc, id: uniqid() });
		});
		setExamplesPins(array);
		console.log(array);
	};

	// const getPhotos = async (query) => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://api.unsplash.com/photos/random/?count=1&client_id=Cd9K_OQqe-7BneBLLeE3Ri0z2bu7kPXwvOICdZPDGwg&query=${query}`
	// 		);
	// 		const data = await response.json();
	// 		// console.log(data);
	// 		return data;
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// };

	// const getExplorePins = () => {
	// 	let promises = [];
	// 	let pinData = [];
	// 	let examples = [
	// 		'holidays',
	// 		'animals',
	// 		'diy',
	// 		'travel',
	// 		'quotes',
	// 		'art',
	// 		'design',
	// 		'tattoos',
	// 		'drink',
	// 		'craft',
	// 	];

	// 	examples.forEach((term) => {
	// 		promises.push(
	// 			getPhotos(term).then((res) => {
	// 				// console.log(res);
	// 				let url = res.urls.regular;
	// 				let id = res.id;
	// 				let termName = term;
	// 				pinData.push({ term: termName, id: id, src: url });
	// 				pinData.sort((a, b) => {
	// 					return 0.5 - Math.random();
	// 				});
	// 			})
	// 		);
	// 	});
	// 	Promise.all(promises).then(() => {
	// 		setExamplesPins(pinData);
	// 		console.log(pinData);
	// 	});
	// };

	useEffect(() => {
		// getExplorePins();
		setExplorePins();
	}, []);

	return (
		<Wrapper>
			<div className="title-explore">Explore Shashinterest</div>
			<Container className="mainboard__container">
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

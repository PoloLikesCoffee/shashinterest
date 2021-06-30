import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import PinHistory from './PinHistory';
import './Mainboard.css';
import { useHistorySearch } from '../../hooks/useHistorySearch';
import { useAuth } from '../../contexts/AuthContext';

const History = ({ getPhotos }) => {
	const [newPins, setNewPins] = useState([]);
	const history = useHistorySearch();
	const { currentUser } = useAuth();
	let historyTermArray = [];

	const capitalizeFirstLetter = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	const convertSecondstoTime = (time) => {
		const dateInMillis = time * 1000;

		const date =
			' Searched the ' +
			new Date(dateInMillis).toDateString() +
			' at ' +
			new Date(dateInMillis).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			}) +
			'.';

		return date;
	};

	useEffect(() => {
		if (history && currentUser) {
			let promises = [];
			let pinData = [];
			history.forEach((item) => {
				historyTermArray.push({ name: item.name, date: item.createdAt });
			});

			historyTermArray.forEach((pinTerm) => {
				promises.push(
					getPhotos(pinTerm.name, 4).then((res) => {
						let results = res.results;

						pinData = pinData.concat({
							search: pinTerm.name,
							date: pinTerm.date,
							results,
						});
						pinData.sort((a, b) => b.date.seconds - a.date.seconds);
					})
				);
			});
			Promise.all(promises).then(() => {
				setNewPins(pinData);
			});
		}
	}, [history, currentUser]);

	return (
		<Wrapper>
			<SearchContainer>
				{history && history.length > 0 && (
					<HistoryContainer>
						{history
							.sort((a, b) => {
								// descending
								return b.createdAt.seconds - a.createdAt.seconds;
							})
							.slice(0, 10)
							.map((item) => {
								return (
									<Item key={uniqid()}>{capitalizeFirstLetter(item.name)}</Item>
								);
							})}
					</HistoryContainer>
				)}
			</SearchContainer>

			{newPins
				.slice(0, 10)
				.filter((item) => item.results.length > 0)
				.map((pin) => {
					return (
						<div key={uniqid()}>
							<TitleSearch>
								<h3>{capitalizeFirstLetter(pin.search)}</h3>
								<TimeContainer>
									{convertSecondstoTime(pin.date.seconds)}
								</TimeContainer>
							</TitleSearch>

							<ItemContainer key={uniqid()}>
								{pin.results.map((pin) => {
									return (
										<PinHistory
											key={uniqid()}
											id={pin.id}
											urls={pin.urls}
											alt={pin.alt_description}
											photographer={pin.user.name}
											link={pin.links.html}
										/>
									);
								})}
							</ItemContainer>
						</div>
					);
				})}
		</Wrapper>
	);
};

export default History;

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 1rem;
`;

const SearchContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const HistoryContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const Item = styled.div`
	width: fit-content;
	padding: 0.3rem 0.6rem;
	margin: 1rem;
	background-color: var(--color-black);
	color: var(--color-white);
	border-radius: 20px;
`;

const TitleSearch = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	border-bottom: 1px solid var(--color-beige);
`;

const TimeContainer = styled.div`
	font-size: 1rem;
	font-style: italic;
	color: var(--color-white);
`;

const ItemContainer = styled.div`
	display: flex;
	justify-content: flex-star;
	height: 100%;
	// column-gap: 0.6rem;
	// height: 100%;
	// margin-left: 1rem;
`;

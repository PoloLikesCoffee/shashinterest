import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import Pin from './Pin';
import './Homeboard.css';

const Homeboard = ({ pins }) => {
	return (
		<Wrapper>
			<Container className="board__container">
				{pins.map((pin) => {
					return (
						<Pin
							key={uniqid()}
							id={pin.id}
							urls={pin.urls}
							alt={pin.alt_description}
							description={pin.description}
							photographer={pin.user.name}
							link={pin.links.html}
						/>
					);
				})}
			</Container>
		</Wrapper>
	);
};

export default Homeboard;

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	margin-top: 1rem;
`;

const Container = styled.div`
	column-gap: 0.6rem;
	margin: 0 auto;
	height: 100%;
`;

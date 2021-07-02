import React from 'react';
import styled from 'styled-components';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

const PinDetail = ({ match, history }) => {
	const name = history.location.state.name;
	const alt = history.location.state.alt;
	const url = history.location.state.url.trueUrl;
	const defaultUrl = history.location.state.url.defaultUrl;
	const link = history.location.state.link.trueLink;
	const defaultLink = history.location.state.link.defaultLink;
	const description = history.location.state.description;

	const trimLink = (string) => {
		if (string) {
			let trimmedLink = string.substring(8, 20);
			return trimmedLink;
		} else {
			// console.log('no string');
			// return (string = 'Default Link');
			return;
		}
	};

	const showDescription = () => {
		if (!description && alt) {
			return alt;
		} else if (description || alt) {
			return description;
		} else if (!description && !alt) {
			return 'This beautiful photo was created by ' + name + '.';
		}
	};

	const addDefaultSrc = (event) => {
		event.target.src = defaultUrl;
		const aGo = event.target.parentNode
			.querySelector('.go-to-url')
			.querySelector('a');
		const aZoom = event.target.parentNode
			.querySelector('.zoom')
			.querySelector('a');
		aGo.href = defaultLink;
		aGo.innerText = trimLink(defaultLink);
		aZoom.href = defaultUrl;
	};

	return (
		<Wrapper>
			<ImageWrapper>
				<Image>
					<img onError={addDefaultSrc} src={url} alt={alt} />
					<div className="go-to-url">
						<CallMadeIcon />
						<a href={link}>{trimLink(link)}</a>
					</div>
					<div className="btn-img zoom">
						<a href={url}>
							<ZoomOutMapIcon />
						</a>
					</div>
				</Image>
			</ImageWrapper>
			<DescriptionDetail>{showDescription()}</DescriptionDetail>
			<UserContainer>
				<UserInfo>Photo taken by {name}.</UserInfo>
			</UserContainer>
		</Wrapper>
	);
};

export default PinDetail;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin: 1rem 0;
`;

const ImageWrapper = styled.div`
	display: inline-flex;
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	position: relative;
`;

const Image = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 500px;

	.btn-img {
		position: absolute;
		z-index: 5;
		opacity: 0;
		right: 17px;
		padding: 0.35rem;
		border-radius: 25px;
		text-align: center;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.zoom {
		bottom: 15px;
		color: var(--color-white);
		background-color: var(--color-gray);
	}

	.zoom:hover {
		background-color: var(--color-transparent);
	}

	img {
		display: flex;
		width: 100%;
		cursor: pointer;
		border-radius: 16px;
		object-fit: cover;
	}

	.go-to-url .MuiSvgIcon-root {
		margin-right: 0.2rem;
	}

	.zoom .MuiSvgIcon-root {
		font-size: 1.7rem;
	}

	.go-to-url {
		font-size: 1rem;
		display: flex;
		align-items: center;
		position: absolute;
		opacity: 0;
		bottom: 20px;
		left: 15px;
		padding: 0.5rem;
		border-radius: 16px;
		color: var(--color-white);
		background-color: var(--color-gray);
	}

	.go-to-url:hover {
		background-color: var(--color-transparent);
	}

	a {
		color: var(--color-white);
		text-decoration: none;
	}

	a:visited {
		color: var(--color-white);
	}

	:hover > .zoom {
		opacity: 1;
	}

	:hover > img {
		filter: brightness(60%);
	}

	:hover > .go-to-url {
		opacity: 1;
	}
`;

const DescriptionDetail = styled.div`
	display: flex;
	width: 500px;
	height: 100%;
	font-size: 1rem;
	font-style: italic;
	align-items: center;
	justify-content: flex-start;
	margin: 0.3rem;
`;

const UserContainer = styled.div`
	display: flex;
	width: 500px;
	height: 100%;
	font-size: 0.9rem;
	align-items: center;
	justify-content: flex-start;
	margin: 0.3rem;
`;

const UserInfo = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: center;
`;

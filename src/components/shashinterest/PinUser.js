import React from 'react';
import styled from 'styled-components';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';

const PinUser = ({ url, alt, name, link, id, handleDelete, description }) => {
	const trimString = (string) => {
		if (string) {
			let length = 20;
			if (string.length > length) {
				let trimmedString = string.substring(0, length - 3) + '...';
				return trimmedString;
			} else {
				return string;
			}
		} else {
			// console.log('no string');
			// return (string = 'Default Name');
			return;
		}
	};

	const trimLink = (string) => {
		if (string) {
			let trimmedLink = string.substring(8, 28) + '...';
			return trimmedLink;
		} else {
			// console.log('no string');
			// return (string = 'Default Link');
			return;
		}
	};

	const addDefaultSrc = (event) => {
		event.target.src =
			'https://images.unsplash.com/photo-1557683316-973673baf926?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80';
	};

	return (
		<Wrapper>
			<Container>
				<div
					className="delete"
					onClick={handleDelete}
					data-photographer={name}
					data-url={url}
					// data-link={link}
					data-alt={alt}
					data-id={id}
				>
					<DeleteForeverIcon />
					Delete
				</div>
				<img onError={addDefaultSrc} src={url} alt={alt} />
				<div className="open">
					{/* <Link to={`/mypage/${id}`}>Open</Link> */}
					<Link
						to={{
							pathname: `/mypage/${id}`,
							state: {
								url: url,
								alt: alt,
								name: name,
								description: description,
							},
						}}
					>
						Open
					</Link>
				</div>
				<div className="go-to-url">
					<CallMadeIcon />
					<a href={link}>{trimLink(link)}</a>
				</div>
			</Container>
			<Name>{trimString(name)}</Name>
		</Wrapper>
	);
};

export default PinUser;

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

	.delete {
		position: absolute;
		z-index: 5;
		opacity: 0;
		top: 15px;
		right: 17px;
		font-size: 0.7rem;
		color: var(--color-white);
		background-color: var(--color-yellow);
		padding: 0.35rem;
		border-radius: 25px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.delete:hover {
		background-color: var(--color-transparent);
	}

	img {
		opacity: 1;
		display: flex;
		width: 100%;
		cursor: pointer;
		border-radius: 16px;
		// border-radius: 6px;
		// border: 4px solid var(--color-black);
		object-fit: cover;
		filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2));
		// filter: grayscale(100%) drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2));
	}

	.open {
		position: absolute;
		opacity: 0;
		font-size: 2rem;
		color: var(--color-white);
	}

	.MuiSvgIcon-root {
		font-size: 1rem;
		margin-right: 0.2rem;
	}

	.go-to-url {
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		position: absolute;
		opacity: 0;
		bottom: 20px;
		left: 15px;
		color: var(--color-white);
	}

	a {
		color: var(--color-white);
		text-decoration: none;
	}

	a:visited {
		color: var(--color-white);
	}

	:hover > .delete {
		opacity: 1;
	}

	:hover > img {
		opacity: 0.7;
	}

	:hover > .open {
		opacity: 1;
	}

	:hover > .go-to-url {
		opacity: 1;
	}
`;

const Name = styled.div`
	position: absolute;
	bottom: -20px;
	left: 10px;
	color: var(--color-black);
`;

import React from 'react';
import styled from 'styled-components';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';

const PinUser = ({ url, alt, name, link, id, handleDelete, description }) => {
	const defaultSrc =
		'https://images.unsplash.com/photo-1557683316-973673baf926?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80';

	const defaultLink = 'https://unsplash.com/photos/pJadQetzTkI';

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
			let trimmedLink = string.substring(8, 20) + '...';
			return trimmedLink;
		} else {
			// console.log('no string');
			// return (string = 'Default Link');
			return;
		}
	};

	const addDefaultSrc = (event) => {
		event.target.src = defaultSrc;
		const aHref = event.target.parentNode
			.querySelector('.go-to-url')
			.querySelector('a');
		aHref.href = defaultLink;
		aHref.innerText = trimLink(defaultLink);
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
					<Link
						to={{
							pathname: `/mypage/${id}`,
							state: {
								url: { trueUrl: url, defaultUrl: defaultSrc },
								link: { trueLink: link, defaultLink: defaultLink },
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
		display: flex;
		width: 100%;
		cursor: pointer;
		border-radius: 16px;
		object-fit: cover;
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
		filter: brightness(60%) drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2));
	}

	:hover > .open {
		opacity: 1;
	}

	.go-to-url:hover {
		opacity: 1;
	}
`;

const Name = styled.div`
	position: absolute;
	bottom: -20px;
	left: 10px;
	color: var(--color-black);
`;

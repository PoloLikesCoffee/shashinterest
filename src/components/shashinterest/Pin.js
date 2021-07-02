import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import CallMadeIcon from '@material-ui/icons/CallMade';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Pin = ({ urls, alt, photographer, link, id, description }) => {
	const { currentUser } = useAuth();
	const [openExist, setOpenExist] = useState(false);
	const [openNotExist, setOpenNotExist] = useState(false);
	const [openLog, setOpenLog] = useState(false);
	const [openSaveError, setOpenSaveError] = useState(false);

	const trimString = (string) => {
		let length = 20;
		if (string.length > length) {
			let trimmedString = string.substring(0, length - 3) + '...';
			return trimmedString;
		} else {
			return string;
		}
	};

	const trimLink = (string) => {
		let trimmedLink = string.substring(8, 20) + '...';
		return trimmedLink;
	};

	const openModalExist = () => {
		setOpenExist(true);
	};

	const closeModalExist = () => {
		setOpenExist(false);
	};

	const openModalNotExist = () => {
		setOpenNotExist(true);
	};

	const closeModalNotExist = () => {
		setOpenNotExist(false);
	};

	const openModalLog = () => {
		setOpenLog(true);
	};

	const closeModalLog = () => {
		setOpenLog(false);
	};

	const openModalSaveError = () => {
		setOpenSaveError(true);
	};

	const closeModalSaveError = () => {
		setOpenSaveError(false);
	};

	const handleSave = (event) => {
		if (currentUser) {
			// console.log('you are logged');
			let dataPhotographer = event.target.getAttribute('data-photographer');
			let dataUrl = event.target.getAttribute('data-url');
			let dataAlt = event.target.getAttribute('data-alt');
			let dataLink = event.target.getAttribute('data-link');
			let dataId = event.target.getAttribute('data-id');
			let dataDescription = event.target.getAttribute('data-description');
			// check if pin already exist in database of current user or save img in the database
			database.images
				.where('id', '==', dataId)
				.where('userId', '==', currentUser.uid)
				.where('name', '==', dataPhotographer)
				.get()
				.then((existingImages) => {
					const existingImg = existingImages.docs[0];
					if (existingImg) {
						// console.log('already exist');
						openModalExist();
						return;
					} else {
						if (!dataPhotographer || !dataUrl || !dataId) {
							// console.log('there is no data from this pin');
							openModalSaveError();
							return;
						} else {
							database.images.add({
								id: dataId,
								name: dataPhotographer,
								description: dataAlt,
								mainDescription: dataDescription,
								url: dataUrl,
								link: dataLink,
								userId: currentUser.uid,
								createdAt: database.getCurrentTimestamp(),
							});
							openModalNotExist();
						}
					}
				});
		} else {
			// console.log('You must log in to access this functionality.');
			openModalLog();
		}
	};

	return (
		<Wrapper>
			<Container>
				<div
					className="save"
					onClick={handleSave}
					data-photographer={photographer}
					data-url={urls.regular}
					data-link={link}
					data-alt={alt}
					data-description={description}
					data-id={id}
				>
					<AddToPhotosIcon />
					Save
				</div>
				<img src={urls?.regular} alt={alt} />
				<div className="open">
					<Link to={`/${id}`}>Open</Link>
				</div>
				<div className="go-to-url">
					<CallMadeIcon />
					<a href={link}>{trimLink(link)}</a>
				</div>
			</Container>
			<Photographer>{trimString(photographer)}</Photographer>
			<Modal
				size="sm"
				show={openExist}
				onHide={closeModalExist}
				animation={false}
				className="special_modal"
			>
				<Modal.Body>The pin already exists in your page.</Modal.Body>
				<Modal.Footer>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
						onClick={closeModalExist}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				size="sm"
				show={openNotExist}
				onHide={closeModalNotExist}
				animation={false}
				className="special_modal"
			>
				<Modal.Body>The pin has been add to your page.</Modal.Body>
				<Modal.Footer>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
						onClick={closeModalNotExist}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				size="sm"
				show={openLog}
				onHide={closeModalLog}
				animation={false}
				className="special_modal"
			>
				<Modal.Body>You must log in to access this functionality.</Modal.Body>
				<Modal.Footer>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
					>
						<Link to="/login" className="nav-style">
							Log In
						</Link>
					</Button>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
						onClick={closeModalLog}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				size="sm"
				show={openSaveError}
				onHide={closeModalSaveError}
				animation={false}
				className="special_modal"
			>
				<Modal.Body>
					Oops, something went wrong, please try again later.
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
						onClick={closeModalSaveError}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Wrapper>
	);
};

export default Pin;

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

	.save {
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
	}

	.save:hover {
		background-color: var(--color-transparent);
	}

	img {
		display: flex;
		width: 100%;
		cursor: zoom-in;
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

	:hover > .save {
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

const Photographer = styled.div`
	position: absolute;
	bottom: -20px;
	left: 10px;
	color: var(--color-black);
`;

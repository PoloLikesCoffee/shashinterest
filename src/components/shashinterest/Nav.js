import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Button, Modal, Form, Overlay, Popover } from 'react-bootstrap';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';

const Nav = ({ searchSubmit }) => {
	const [searchInput, setSearchInput] = useState('');
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [description, setDescription] = useState('');
	const { currentUser } = useAuth();
	const [openLog, setOpenLog] = useState(false);
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);
	const history = useHistory();

	const handlePop = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	const pushInDatabase = (term) => {
		// check if search already exist in database of current user or save search in the database
		database.historySearch
			.where('name', '==', term)
			.where('userId', '==', currentUser.uid)
			.get()
			.then((history) => {
				const historyItem = history.docs[0];
				// console.log(history.docs);
				if (historyItem) {
					// console.log('already exist');
					return;
				} else {
					database.historySearch.add({
						name: term,
						userId: currentUser.uid,
						createdAt: database.getCurrentTimestamp(),
					});
				}
			});
	};

	const onSearchSubmit = (event) => {
		event.preventDefault();
		history.push('/');
		searchSubmit(searchInput);
		if (currentUser) {
			// load history user search array
			pushInDatabase(searchInput.toLowerCase());
		} else {
			// load default search array
			return;
		}
		setSearchInput('');
		// console.log(searchInput);
	};

	const openModal = () => {
		if (currentUser) {
			// console.log('you are logged');
			setOpen(true);
		} else {
			// console.log('You must log in to access this functionality.');
			openModalLog();
		}
	};

	const closeModal = () => {
		setOpen(false);
	};

	const openModalLog = () => {
		setOpenLog(true);
	};

	const closeModalLog = () => {
		setOpenLog(false);
	};

	const handleSubmitNewPin = (event) => {
		event.preventDefault();

		// create an img in the database
		database.images.add({
			id: uniqid(),
			name: name,
			description: description,
			url: url,
			userId: currentUser.uid,
			createdAt: database.getCurrentTimestamp(),
		});
		setName('');
		setDescription('');
		setUrl('');
		closeModal();
	};

	return (
		<Wrapper ref={ref}>
			<LogoWrapper>
				<PhotoLibraryIcon />
				Shashinterest
			</LogoWrapper>

			<Buttons>
				<Link className="nav-style" to="/">
					Home
				</Link>
			</Buttons>

			<Buttons>
				<Link className="nav-style" to="/mypage">
					My Shashin
				</Link>
			</Buttons>

			<Link className="nav-style" to="/explore" title="Explore new ideas">
				<IconButton>
					<ExploreIcon />
				</IconButton>
			</Link>

			<IconButton onClick={openModal}>
				<AddCircleIcon />
			</IconButton>

			<SearchWrapper>
				<SearchBarWrapper>
					<IconButton>
						<SearchIcon />
					</IconButton>
					<form>
						<input
							type="text"
							value={searchInput}
							placeholder="Search for shashin, inspirations, etc."
							onChange={(event) => setSearchInput(event.target.value)}
						/>
						<button type="submit" onClick={onSearchSubmit}></button>
					</form>
				</SearchBarWrapper>
			</SearchWrapper>
			<IconsWrapper>
				<Link className="nav-style" to="/history">
					<IconButton>
						<HistoryIcon />
					</IconButton>
				</Link>

				<Link className="nav-style" to="/user">
					<IconButton>
						{/* <FaceIcon /> */}
						<AccountCircleIcon />
					</IconButton>
				</Link>
				<a
					href="https://github.com/PoloLikesCoffee"
					style={{
						color: `var(--color-black)`,
						textDecoration: 'none',
					}}
				>
					<IconButton>
						<GitHubIcon />
					</IconButton>
				</a>

				<IconButton onClick={handlePop}>
					<KeyboardArrowDownIcon />
				</IconButton>
			</IconsWrapper>
			<Modal
				size="sm"
				show={open}
				onHide={closeModal}
				animation={false}
				className="special_modal"
			>
				<Form onSubmit={handleSubmitNewPin}>
					<Modal.Body>
						<Form.Group>
							<Form.Label className="mt-4">Name of the photograph: </Form.Label>
							<Form.Control
								type="text"
								required
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-4">
								A little description of the photo:{' '}
							</Form.Label>
							<Form.Control
								type="text"
								required
								value={description}
								onChange={(event) => setDescription(event.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-4">URL of the photo: </Form.Label>
							<Form.Control
								type="text"
								required
								value={url}
								onChange={(event) => setUrl(event.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{
								backgroundColor: `var(--color-black)`,
								color: `var(--color-white)`,
								borderRadius: '25px',
								border: 'none',
							}}
							type="submit"
						>
							Add Shashin
						</Button>
						<Button
							style={{
								backgroundColor: `var(--color-black)`,
								color: `var(--color-white)`,
								borderRadius: '25px',
								border: 'none',
							}}
							onClick={closeModal}
						>
							Close
						</Button>
					</Modal.Footer>
				</Form>
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
					<Button className="special_modal_button">
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
			<Overlay
				show={show}
				target={target}
				placement="bottom"
				container={ref.current}
				containerPadding={20}
			>
				<Popover
					id="popover-contained"
					style={{
						backgroundColor: `var(--color-white)`,

						color: `var(--color-black)`,
						borderRadius: '25px',
					}}
				>
					<Popover.Content>
						<div
							style={{
								borderBottom: '2px solid',
								borderColor: `var(--color-beige)`,
							}}
						>
							About Shashinterest
						</div>
						<div
							style={{
								marginTop: '0.5rem',
							}}
						>
							For this project, I use all the stuff I learned from the
							Javascript part of The Odin Project. I used the Unsplash API to
							get the beautiful photos. I also used Bootstrap, useRef,
							styled-component, material-ui and firebase authentication that I
							was not familiar with. I hope you will enjoy this final project.
						</div>
					</Popover.Content>
				</Popover>
			</Overlay>
		</Wrapper>
	);
};

export default Nav;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	height: 3.5rem;
	padding: 0.75rem 0.25rem 0.25rem 1rem;
	background-color: var(--color-yellow);
	color: var(--color-black);

	@media (min-width: 0px) and (max-width: 815px) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 3rem;
	}
`;

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	color: var(--color-white);
	font-size: 1.3rem;
	.MuiSvgIcon-root {
		color: var(--color-white);
		font-size: 1.5rem;
		margin-right: 0.1rem;
	}
`;

const Buttons = styled.div`
	display: flex;
	height: 2rem;
	min-width: 6rem;
	margin: 0 0.5rem;
	align-items: center;
	justify-content: center;
	border-radius: 25px;
	cursor: pointer;
	background-color: var(--color-yellow);

	.nav-style {
		color: var(--color-gray-transparent);
		text-decoration: none;
	}

	:hover {
		background-color: var(--color-transparent);
	}

	.nav-style:hover {
		color: var(--color-black);
	}
`;

const SearchWrapper = styled.div`
	flex: 1;
	margin: 0.3rem;
`;

const SearchBarWrapper = styled.div`
	background-color: var(--color-beige);
	display: flex;
	height: 2.5rem;
	width: 100%;
	min-width: 120px;
	border-radius: 25px;
	border: none;
	padding-left: 0.3rem;

	form {
		display: flex;
		flex: 1;
	}

	form > input {
		background-color: transparent;
		color: var(--color-gray-transparent);
		border: none;
		width: 100%;
		margin-left: 0.5rem;
		font-size: 1rem;
	}

	form > input::placeholder {
		color: var(--color-gray-transparent);
		font-size: 0.9rem;
		opacity: 0.5;
	}

	form > button {
		display: none;
	}

	input:focus {
		outline: none;
	}
`;

const IconsWrapper = styled.div``;

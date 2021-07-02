import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import CallMadeIcon from '@material-ui/icons/CallMade';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import GetAppIcon from '@material-ui/icons/GetApp';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

const PinDetail = ({ match }) => {
	useEffect(() => {
		fetchPin();
	}, []);

	const [pin, setPin] = useState({});
	const { currentUser } = useAuth();
	const [openExist, setOpenExist] = useState(false);
	const [openNotExist, setOpenNotExist] = useState(false);
	const [openLog, setOpenLog] = useState(false);
	const [openSaveError, setOpenSaveError] = useState(false);

	const trimString = (string) => {
		if (string) {
			let length = 13;
			if (string.length > length) {
				let trimmedString = string.substring(0, length - 3) + '.';
				return trimmedString;
			} else {
				return string;
			}
		} else {
			return;
		}
	};

	const fetchPin = async () => {
		const fetchPin = await fetch(
			`https://api.unsplash.com/photos/${match.params.id}?client_id=Cd9K_OQqe-7BneBLLeE3Ri0z2bu7kPXwvOICdZPDGwg`
		);
		const pin = await fetchPin.json();
		setPin(pin);
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
			{pin.tags && pin.tags.length > 0 && (
				<Tags>
					{pin.tags.slice(0, 5).map((item) => {
						return <Tag key={uniqid()}>{item.title}</Tag>;
					})}
				</Tags>
			)}
			<ImageWrapper>
				<Image>
					<div
						className="btn-img save"
						onClick={handleSave}
						data-photographer={pin.user?.name}
						data-url={pin.urls?.regular}
						data-alt={pin.alt_description}
						data-description={pin.description}
						data-id={pin.id}
					>
						<AddToPhotosIcon />
						Save
					</div>
					<img src={pin.urls?.regular} alt={pin.alt_description} />

					<div className="go-to-url">
						<CallMadeIcon />
						<a href={pin.links?.html}>Unsplash.com</a>
					</div>

					<div className="btn-img zoom">
						<a href={pin.urls?.full}>
							<ZoomOutMapIcon />
						</a>
					</div>
				</Image>
			</ImageWrapper>
			<Legend>
				<div>Photo from Unsplash</div>
				<PhotoInfo>
					<FavoriteIcon
						style={{
							marginLeft: '0.3rem',
							marginRight: '0.3rem',
						}}
					/>
					{pin.likes}
					<VisibilityIcon
						style={{
							marginLeft: '0.3rem',
							marginRight: '0.3rem',
						}}
					/>
					{pin.views}
					<GetAppIcon
						style={{
							marginLeft: '0.3rem',
							marginRight: '0.3rem',
						}}
					/>
					{pin.downloads}
				</PhotoInfo>
			</Legend>
			<DescriptionDetail>{pin.description}</DescriptionDetail>
			<DateContainer>
				Photo created at {trimString(pin?.created_at)}
			</DateContainer>
			<UserContainer>
				<UserImg>
					<img src={pin.user?.profile_image?.medium} alt={pin.user?.name} />
				</UserImg>
				<UserInfo>
					<div
						style={{
							marginLeft: '1rem',
						}}
					>
						Photo created by {pin.user?.name}
					</div>
					<div>
						<FavoriteIcon
							style={{
								marginRight: '0.3rem',
							}}
						/>
						{pin.user?.total_likes}
						<PhotoLibraryIcon
							style={{
								marginLeft: '0.3rem',
								marginRight: '0.3rem',
							}}
						/>
						{pin.user?.total_photos}
					</div>
				</UserInfo>
			</UserContainer>
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

const Tags = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const Tag = styled.div`
	width: fit-content;
	padding: 0.3rem 0.6rem;
	margin: 1rem;
	background-color: var(--color-black);
	color: var(--color-white);
	border-radius: 20px;
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

	.save {
		font-size: 1rem;
		top: 15px;
		color: var(--color-white);
		background-color: var(--color-yellow);
	}

	.zoom {
		bottom: 15px;
		color: var(--color-white);
		background-color: var(--color-gray);
	}

	.save:hover,
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

	.save .MuiSvgIcon-root {
		font-size: 1rem;
		margin-right: 0.2rem;
	}

	.zoom .MuiSvgIcon-root {
		font-size: 1.7rem;
	}

	.go-to-url .MuiSvgIcon-root {
		margin-right: 0.2rem;
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

	:hover > .save {
		opacity: 1;
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

const Legend = styled.div`
	display: flex;
	width: 500px;
	height: 100%;
	font-size: 1.2rem;
	align-items: center;
	justify-content: space-between;
`;

const PhotoInfo = styled.div`
	display: flex;
	width: fit-content;
	align-items: center;
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

const DateContainer = styled.div`
	display: flex;
	width: 500px;
	height: 100%;
	font-size: 0.9rem;
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

const UserImg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 50px;
	img {
		opacity: 1;
		display: flex;
		width: 100%;
		cursor: zoom-in;
		border-radius: 25px;
		object-fit: cover;
	}
`;

const UserInfo = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: space-between;
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import PinUser from './PinUser';
import { useImage } from '../../hooks/useImage';
import './Mainboard.css';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const MyPage = () => {
	const images = useImage();

	const { currentUser } = useAuth();
	const [openDelete, setOpenDelete] = useState(false);
	const [openError, setOpenError] = useState(false);

	const openModalDelete = () => {
		setOpenDelete(true);
	};

	const closeModalDelete = () => {
		setOpenDelete(false);
	};

	const openModalError = () => {
		setOpenError(true);
	};

	const closeModalError = () => {
		setOpenError(false);
	};

	const handleDelete = (event) => {
		// console.log('The pin has been deleted');
		let dataPhotographer = event.target.getAttribute('data-photographer');
		let dataUrl = event.target.getAttribute('data-url');

		// check the pin in database of current user and delete it from the database
		database.images
			.where('name', '==', dataPhotographer)
			.where('userId', '==', currentUser.uid)
			.where('url', '==', dataUrl)
			.get()
			.then((img) => {
				if (!img.docs[0]) {
					console.log('An error just happened, just try again.');
					openModalError();
					return;
				} else {
					img.docs[0].ref.delete();
					openModalDelete();
				}
			});
	};

	return (
		<Wrapper>
			{images && images.length > 0 && (
				<Container className="mainboard__container">
					{images.map((img) => (
						<div key={img.id}>
							<PinUser
								key={img.id}
								id={img.id}
								url={img.url}
								alt={img.description}
								name={img.name}
								description={img.mainDescription}
								link={img.url}
								handleDelete={handleDelete}
							/>
						</div>
					))}
				</Container>
			)}
			<Modal
				size="sm"
				show={openDelete}
				onHide={closeModalDelete}
				animation={false}
				className="special_modal"
			>
				<Modal.Body>The pin has been delete from your page.</Modal.Body>
				<Modal.Footer>
					<Button
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
						onClick={closeModalDelete}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				size="sm"
				show={openError}
				onHide={closeModalError}
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
						onClick={closeModalError}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Wrapper>
	);
};

export default MyPage;

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

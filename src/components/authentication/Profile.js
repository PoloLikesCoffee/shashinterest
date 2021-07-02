import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Profile = () => {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const { history } = useHistory();
	const [didMount, setDidMount] = useState(false);

	// Remove console error
	useEffect(() => {
		setDidMount(true);
		return () => {
			setDidMount(false);
			// setError('');
		};
	}, []);

	if (!didMount) {
		return null;
	}

	const handleLogOut = async () => {
		setError('');

		try {
			await logout();
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	};

	return (
		<CenteredContainer>
			<Card
				style={{
					backgroundColor: `var(--color-white)`,
					border: 'none',
					borderRadius: '25px',
					filter: 'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2))',
				}}
			>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email: </strong>
					{currentUser.email}
					<Link
						to="/update-profile"
						className="btn w-100 mt-3"
						style={{
							backgroundColor: `var(--color-black)`,
							color: `var(--color-white)`,
							borderRadius: '25px',
							border: 'none',
						}}
					>
						Update Profile
					</Link>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-3">
				<Button
					style={{
						backgroundColor: `var(--color-black)`,
						color: `var(--color-white)`,
						borderRadius: '25px',
						border: 'none',
						filter: 'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2))',
					}}
					onClick={handleLogOut}
				>
					Log Out
				</Button>
			</div>
		</CenteredContainer>
	);
};

export default Profile;

import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const UpdateProfile = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [didMount, setDidMount] = useState(false);

	// Remove console error
	useEffect(() => {
		setDidMount(true);
		return () => {
			setDidMount(false);
			// setLoading(false);
			// setError('');
		};
	}, []);

	if (!didMount) {
		return null;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		setLoading(true);
		setError('');
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/user');
			})
			.catch(() => {
				setError('Failed to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<CenteredContainer>
			<Card
				style={{
					backgroundColor: `var(--color-white)`,
					border: 'none',
					borderRadius: '25px',
					filter: 'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2))',
					marginTop: '3rem',
				}}
			>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group
							style={{
								marginBottom: '1rem',
							}}
							id="email"
						>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group
							style={{
								marginBottom: '1rem',
							}}
							id="password"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Leave it empty to keep the same password..."
							/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								placeholder="Leave it empty to keep the same password..."
							/>
						</Form.Group>
						<Button
							style={{
								marginTop: '1rem',
								backgroundColor: `var(--color-black)`,
								color: `var(--color-white)`,
								borderRadius: '25px',
								border: 'none',
							}}
							disabled={loading}
							className="w-100"
							type="submit"
						>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-3">
				<Link
					to="/user"
					className="btn"
					style={{
						backgroundColor: `var(--color-black)`,
						color: `var(--color-white)`,
						borderRadius: '25px',
						border: 'none',
						filter: 'drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.2))',
					}}
				>
					Cancel
				</Link>
			</div>
		</CenteredContainer>
	);
};

export default UpdateProfile;

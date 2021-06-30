import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	// Remove console error
	// useEffect(() => {
	// 	return () => {
	// 		setLoading(false);
	// 		setMessage('');
	// 		setError('');
	// 	};
	// });

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}
		setLoading(false);
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
					<h2 className="text-center mb-4">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
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
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link
							to="/login"
							className="btn"
							style={{
								color: `var(--color-black)`,
								borderRadius: '25px',
								border: 'none',
								textDecoration: 'underline',
							}}
						>
							Login
						</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account?{' '}
				<Link
					to="/signup"
					className="btn"
					style={{
						color: `var(--color-black)`,
						borderRadius: '25px',
						border: 'none',
						textDecoration: 'underline',
					}}
				>
					Sign Up
				</Link>
			</div>
		</CenteredContainer>
	);
};

export default ForgotPassword;

import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	// Remove console error
	useEffect(() => {
		return () => {
			setLoading(false);
			setError('');
		};
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/mypage');
		} catch {
			setError('Failed to log in');
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
					<h2 className="text-center mb-4">Login In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group
							style={{
								marginBottom: '1rem',
							}}
							id="email"
						>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group
							style={{
								marginBottom: '1rem',
							}}
							id="password"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
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
							Log In
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link
							to="/forgot-password"
							className="btn"
							style={{
								color: `var(--color-black)`,
								borderRadius: '25px',
								border: 'none',
								textDecoration: 'underline',
							}}
						>
							Forgot Password?
						</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-3">
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

export default Login;

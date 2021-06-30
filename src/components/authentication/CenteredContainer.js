import React from 'react';
import { Container } from 'react-bootstrap';

const CenteredContainer = ({ children }) => {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: '50vh', backgroundColor: `var(--color-yellow)` }}
		>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				{children}
			</div>
		</Container>
	);
};

export default CenteredContainer;

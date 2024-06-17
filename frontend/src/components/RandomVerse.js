// src/components/RandomVerse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const RandomVerse = () => {
	const [verse, setVerse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRandomVerse = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get('http://localhost:5000/random-verse');
			setVerse(response.data);
		} catch (error) {
			setError('Failed to fetch verse');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRandomVerse();
	}, []);

	return (
		<Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100">
			<Row className="w-100 justify-content-center">
				<Col xs={11} md={8} lg={6}>
					<h1 className="text-center mb-4 text-primary">Random Quran Verse</h1>
					{loading ? (
						<Spinner animation="border" role="status" className="d-block mx-auto">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					) : (
						<Card className="text-center shadow mb-4">
							{error ? (
								<Card.Body>
									<Card.Text className="text-danger">{error}</Card.Text>
								</Card.Body>
							) : (
								<Card.Body>
									<Card.Title className="mb-3">{verse.surah} - Verse {verse.index}</Card.Title>
									<Card.Text className="mb-4" style={{ fontSize: '1.2em' }}>
										"{verse.arabic}"
									</Card.Text>
									<Card.Text className="text-muted">
										<em>{verse.english}</em>
									</Card.Text>
								</Card.Body>
							)}
						</Card>
					)}
					<Button
						variant="primary"
						className="d-block mx-auto"
						onClick={fetchRandomVerse}
						disabled={loading}
					>
						{loading ? (
							<>
								<Spinner animation="border" role="status" size="sm">
									<span className="visually-hidden">Loading...</span>
								</Spinner> Fetching...
							</>
						) : (
							<>
								<FontAwesomeIcon icon={faSyncAlt} /> Get Random Verse
							</>
						)}
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default RandomVerse;

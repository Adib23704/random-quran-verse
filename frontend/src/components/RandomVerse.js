import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
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
			const response = await axios.get('http://localhost:3001/random-verse');
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
		<Container className="d-flex flex-column align-items-center mt-5">
			<h1 className="mb-4 text-primary">Random Quran Verse</h1>
			{loading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<Card className="text-center shadow" style={{ width: '80%', maxWidth: '600px' }}>
					{error ? (
						<Card.Body>
							<Card.Text className="text-danger">{error}</Card.Text>
						</Card.Body>
					) : (
						<Card.Body>
							<Card.Title className="mb-3">{verse.surah} - Ayah {verse.index}</Card.Title>
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
				className="mt-4"
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
		</Container>
	);
};

export default RandomVerse;

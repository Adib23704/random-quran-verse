require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axiosRetry = require('axios-retry').default;

const PORT = process.env.PORT || 3000;
const SURAH_URL = process.env.SURAH_URL;

const app = express();
app.use(
	cors({
		origin: "*"
	})
);
// app.use(helmet());
app.use(morgan('dev'));

axiosRetry(axios, {
	retries: 3, // Number of retries
	retryDelay: (retryCount) => {
		console.log(`Retry attempt: ${retryCount}`);
		return retryCount * 1000; // Time in ms
	},
	retryCondition: (error) => {
		return error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED'; // Retry on timeout
	},
});

app.get('/random-verse', async (req, res) => {
	try {
		const surahResponse = await axios.get(`${SURAH_URL}/${Math.floor(Math.random() * 114) + 1}.json`);
		const surah = surahResponse.data;
		const index = Math.floor(Math.random() * surah.totalAyah) + 1;

		res.status(200).json({
			index,
			arabic: surah.arabic1[index],
			english: surah.english[index],
			surah: surah.surahName,
		});
	} catch (error) {
		console.error('Error fetching verse:', error);
		res.status(500).json({ error: 'Failed to fetch verse' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

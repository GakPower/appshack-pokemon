import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const LINK_BASE = 'https://pokeapi.co/api/v2/pokemon';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { limit = 100, offset = 0 } = req.body;

	if (req.method !== 'POST') {
		return res.status(400).json({ error: true, message: 'Invalid request method' });
	}

	if (limit <= 0) {
		return res.status(400).json({ error: true, message: 'Invalid limit provided' });
	}

	const link = `${LINK_BASE}?limit=${limit}${offset ? `&offset=${offset}` : ''}`;
	const { next, results } = (await axios.get(link)).data;

	return res.status(200).json({ next, results });
};

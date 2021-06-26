import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const LINK_BASE = 'https://pokeapi.co/api/v2/pokemon';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		return res.status(400).json({ error: true, message: 'Invalid request method' });
	}

	const link = `${LINK_BASE}?limit=100000`;

	const { results } = (await axios.get(link)).data;

	return res.status(200).json({ results });
};

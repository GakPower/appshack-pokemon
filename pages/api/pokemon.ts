import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const LINK_BASE = 'https://pokeapi.co/api/v2/pokemon';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { limit = 10, offset = 0 } = req.body;

	if (req.method !== 'POST') {
		return res.status(400).json({ error: true, message: 'Invalid request method' });
	}

	if (limit <= 0) {
		return res.status(400).json({ error: true, message: 'Invalid limit provided' });
	}

	const link = `${LINK_BASE}?limit=${limit}${offset ? `&offset=${offset}` : ''}`;
	const { next, results } = (await axios.get(link)).data;

	const pokemonArray = results.map(async (result: any) => {
		const { abilities, sprites } = (await axios.get(result.url)).data;
		const simplifiedAbilities = abilities.map((ability: any) => ability.ability.name);
		return { name: result.name, abilities: simplifiedAbilities, picture: sprites.other['official-artwork'].front_default };
	});

	return res.status(200).json({ next, results: await Promise.all(pokemonArray) });
};
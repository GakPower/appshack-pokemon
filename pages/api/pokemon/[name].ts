import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const LINK_BASE = 'https://pokeapi.co/api/v2/pokemon';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { name } = req.query;

	if (req.method !== 'GET') {
		return res.status(400).json({ error: true, message: 'Invalid request method' });
	}
	if (!name) {
		return res.status(400).json({ error: true, message: 'Invalid pokemon name' });
	}

	const link = `${LINK_BASE}/${name}`;

	const { abilities, sprites } = (await axios.get(link)).data;
	const simplifiedAbilities = abilities.map((ability: any) => ability.ability.name);

	return res.status(200).json({ name, abilities: simplifiedAbilities, picture: sprites.other['official-artwork'].front_default });
};

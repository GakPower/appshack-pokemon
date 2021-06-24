import axios from "axios";

export const getPokemon = async (limit?: number, offset?: number) => {
	const { error, next, results } = (await axios.post('/api/pokemon', { limit, offset })).data;

	if (error) return {};

	if (!next) {
		return { next: null, results };
	}

	const url = new URL(next);
	const nextLimit = url.searchParams.get('limit');
	const nextOffset = url.searchParams.get('offset');
	return { next: { limit: nextLimit, offset: nextOffset }, results };
};

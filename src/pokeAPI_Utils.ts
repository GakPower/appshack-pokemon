import axios from "axios";

export const getPokemon = async (pageNumber?: number) => {
	const { error, count, next, results } = (await axios.post('/api/pokemon', { pageNumber })).data;

	if (error) return {};

	if (!next) {
		return { next: null, results };
	}

	const url = new URL(next);
	const nextLimit = url.searchParams.get('limit');
	const nextOffset = url.searchParams.get('offset');
	return { count, next: { limit: nextLimit, offset: nextOffset }, results };
};

import axios from "axios";

export const getAllPokemon = async () => {
	const { error, ...data } = (await axios.get('/api/pokemon')).data;

	if (error) return {};

	return data;
};

export const getPokemon = async (name: string) => {
	const { error, ...data } = (await axios.get(`/api/pokemon/${name}`)).data;

	if (error) return {};

	return data;
};

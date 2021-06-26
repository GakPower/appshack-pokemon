import axios from "axios";

export const getAllPokemon = async () => {
	const { error, ...data } = (await axios.get('/api/pokemon')).data;

	if (error) return {};

	return data;
};

export const getBasicPokemon = async (name: string) => {
	const { error, ...data } = (await axios.get(`/api/pokemon/${name}`)).data;

	if (error) return {};

	const abilities = getSimplifiedAbilities(data.abilities);
	const picture = data.sprites.other['official-artwork'].front_default;
	return { name, abilities, picture };
};

export const getFullPokemon = async (name: string) => {
	const { error, ...data } = (await axios.get(`/api/pokemon/${name}`)).data;

	if (error) return {};

	const abilities = getSimplifiedAbilities(data.abilities);
	const picture = data.sprites.other['official-artwork'].front_default;
	let stats = {};
	data.stats.forEach((stat: any) => (stats = { ...stats, [stat.stat.name]: stat.base_stat }));

	return { name, abilities, picture, weight: data.weight, species: data.species.name, stats };
};

const getSimplifiedAbilities = (abilities: any[]) => {
	return abilities.map((ability: any) => ability.ability.name);
};

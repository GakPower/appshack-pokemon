import axios from "axios";

export const getAllPokemon = async () => {
	const { error, ...data } = (await axios.get('/api/pokemon')).data;

	if (error) return {};

	return data;
};

export const getBasicPokemon = async (name: string) => {
	const { error, ...data } = (await axios.get(`/api/pokemon/${name}`)).data;

	if (error) return {};

	const simplifiedAbilities = getSimplifiedAbilities(data.abilities);
	return { name, abilities: simplifiedAbilities, picture: data.sprites.other['official-artwork'].front_default };
};

const getSimplifiedAbilities = (abilities: any[]) => {
	return abilities.map((ability: any) => ability.ability.name);
};

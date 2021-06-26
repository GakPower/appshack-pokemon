import axios from "axios";
import { BasicPokemon, FullPokemon } from "./types";

type StatType = { stat: { name: string }, base_stat: number };
type AbilitiesType = { ability: { name: string } }[];

export const getAllPokemon = async (): Promise<{ name: string }[]> => {
	const { error, results } = (await axios.get('/api/pokemon')).data;

	if (error) return [];

	return results;
};

export const getBasicPokemon = async (name: string): Promise<BasicPokemon> => {
	const data = (await axios.get(`/api/pokemon/${name}`)).data;

	const abilities = getSimplifiedAbilities(data.abilities);
	const picture = data.sprites.other['official-artwork'].front_default;
	return { name, abilities, picture };
};

export const getFullPokemon = async (name: string): Promise<FullPokemon> => {
	const { sprites, weight, species, ...data } = (await axios.get(`/api/pokemon/${name}`)).data;

	const abilities = getSimplifiedAbilities(data.abilities);
	const picture = sprites.other['official-artwork'].front_default;
	let stats = {};
	data.stats.forEach((stat: StatType) => (stats = { ...stats, [stat.stat.name]: stat.base_stat }));
	return { name, abilities, picture, weight, stats, species: species.name };
};

const getSimplifiedAbilities = (abilities: AbilitiesType) => {
	return abilities.map((ability) => ability.ability.name);
};

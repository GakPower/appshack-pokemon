export type BasicPokemon = {
	name: string,
	abilities: string[],
	picture: string
}
export type FullPokemon = BasicPokemon & {
	weight: number,
	species: string,
	stats: { [stat: string]: string } | {}
}

export type FlexiblePokemon = BasicPokemon & {
	weight?: number,
	species?: string,
	stats?: { [stat: string]: string } | {}
}

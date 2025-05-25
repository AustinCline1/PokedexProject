import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";
    private cache: Cache;
    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }


    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached){
            return cached;
        }
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const locations: ShallowLocations = await response.json();
            this.cache.set(url, locations);
            return locations;
        }catch(e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }

    }

    async fetchLocation(locationName: string): Promise<Locations> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.cache.get<Locations>(url);
        if (cached){
            return cached;
        }
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const location: Locations = await response.json();
            this.cache.set<Locations>(url, location);
            return location;
        }catch(e) {
            throw new Error(`Error fetching location: ${(e as Error).message}`);
        }
    }

    async fetchPokemon(pokemonName:string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get<Pokemon>(url);
        if (cached){
            return cached;
        }
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const pokemon: Pokemon = await response.json();
            this.cache.set<Pokemon>(url, pokemon);
            return pokemon;
        }catch(e) {
            throw new Error(`Error fetching pokemon: ${(e as Error).message}`);
        }
    }

}
    export type Pokemon = {
        id: number;
        name: string;
        base_experience: number;
        height: number;
        is_default: boolean;
        order: number;
        weight: number;
        abilities: [{
            is_hidden: boolean;
            slot: number;
            ability: {
                name: string;
                url: string;
            }
        }];
        stats: [{
            base_stat: number;
            effort: number;
            stat: {
                name: string;
                url: string;
            }

        }];
        types:[{
            slot: number;
            type: {
                name: string;
                url: string;
            }
        }]
    }
    export type ShallowLocations = {
        count:number;
        next: string;
        previous: string;
        results: {
            name: string,
            url: string,
        }[];
    };

    export type Locations = {
        encounter_method_rates: {
            encounter_method: {
                name: string;
                url: string;
            };
            version_details: {
                rate: number;
                version: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
        game_index: number;
        id: number;
        location: {
            name: string;
            url: string;
        };
        name: string;
        names: {
            language: {
                name: string;
                url: string;
            };
            name: string;
        }[];
        pokemon_encounters: {
            pokemon: {
                name: string;
                url: string;
            };
            version_details: {
                encounter_details: {
                    chance: number;
                    condition_values: any[];
                    max_level: number;
                    method: {
                        name: string;
                        url: string;
                    };
                    min_level: number;
                }[];
                max_chance: number;
                version: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    }


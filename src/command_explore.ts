import {State} from "./state.js";
export async function command_explore(state: State ,...args: string[]): Promise<void> {
    if (!args[0])
    {
        throw new Error("No location specified");
    }
    if(args.length > 2) {
        throw new Error("Too many arguments");
    }
    console.log(
        `Searching for pokemon in ${args[0]}`
    )
    const response= await state.pokeapi.fetchLocation(args[0]);
    for(const Pokemon of response.pokemon_encounters) {
        console.log(` - ${Pokemon.pokemon.name}`);
    }
}
import {State} from "./state.js";
export async function command_catch(state: State,...args: string[]): Promise<void>{
    if (!args[0])
    {
        throw new Error("No pokemon specified");
    }
    if(args.length > 2) {
        throw new Error("Too many arguments");
    }
    console.log(`Throwing a Pokeball at ${args[0]}...`);
    const response = await state.pokeapi.fetchPokemon(args[0]);
    const chance = Math.floor(Math.random() * response.base_experience);
    if (chance > 60) {
        console.log(`${args[0]} escaped!`);
        return;
    }
    else if(!state.pokedex[args[0]]) {
        state.pokedex[args[0]] = response;
    }
    console.log(`You caught ${args[0]}!`)
    console.log(`A list of abilities:`)
    for(const ability in state.pokedex[args[0]].abilities) {
        console.log(`Ability:${parseInt(ability) + 1} ${state.pokedex[args[0]].abilities[parseInt(ability)].ability.name}`)
    }
    console.log(`For more information, type 'inspect ${args[0]}'`);

}
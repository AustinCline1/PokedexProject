import {State} from "./state.js";
export async function command_inspect(state: State, ...args: string[]): Promise<void> {
    if(!args[0]) {
        throw new Error("No pokemon specified");
    }
    if(!state.pokedex[args[0]]) {
        throw new Error("You have not caught this pokemon yet!");
    }
    console.log(`Name: ${state.pokedex[args[0]].name}`);
    console.log(`Height: ${state.pokedex[args[0]].height}`);
    console.log(`Weight: ${state.pokedex[args[0]].weight}`);
    console.log(`Stats:`);
    for(const stat of state.pokedex[args[0]].stats) {
        console.log(` -${stat.stat.name}: ${stat.base_stat}:`)
    }
    console.log(`Types:`);
    for(const type of state.pokedex[args[0]].types) {
        console.log(` - ${type.type.name}`);
    }
}
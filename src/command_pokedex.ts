import {State} from "./state";

export async function command_pokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    for(const pokemon in state.pokedex) {
        console.log(` - ${pokemon}`);
    }
}
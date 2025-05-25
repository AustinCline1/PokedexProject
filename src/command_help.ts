import {State} from "./state.js";
export async function command_help(state: State): Promise<void> {
    const allCommands = state.commands;
    console.log("Welcome to the Pokedex!");
    console.log("Usage: ");
    console.log();
    for (const command in allCommands) {
        console.log(`${command}: ${allCommands[command].description}`);
    }
}
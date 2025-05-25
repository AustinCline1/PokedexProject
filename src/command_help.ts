import {getCommands} from "./repl.js";
import {CLICommand} from "./command";
export function command_help(commands: Record<string,CLICommand>) {
    const allCommands = getCommands();
    console.log("Welcome to the Pokedex!");
    console.log("Usage: ");
    console.log();
    for (const command in allCommands) {
        console.log(`${command}: ${allCommands[command].description}`);
    }
}
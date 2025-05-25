import {createInterface} from "node:readline"
import {command_exit} from "./command_exit.js";
import {command_help} from "./command_help.js";
import {CLICommand} from "./command";

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(' ').filter((word) => word !=="");
}

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
})
export function startREPL(){
    rl.prompt();
    rl.on("line", (line) => {
        const input = cleanInput(line);
        if(input.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = input[0];
        const commands = getCommands();
        const cmd = commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: ${commandName}. Type 'help' for a list of commands.`);
            rl.prompt();
            return;
        }
        cmd.callback(commands);
        rl.prompt();
    })
}

export function getCommands(): Record<string,CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: command_help,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: command_exit,
            },
        }
    }

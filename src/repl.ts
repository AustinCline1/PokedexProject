import {State} from "./state.js";

export async function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async (line) => {
        const input = cleanInput(line);
        if(input.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = input[0];
        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: ${commandName}. Type 'help' for a list of commands.`);
            state.rl.prompt();
            return;
        }
        try {
            await cmd.callback(state);
        }catch(err){
            console.log(err);
        }
        state.rl.prompt();
    })
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(' ').filter((word) => word !=="");
}



import {createInterface} from "node:readline"

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
        console.log(`Your command was: ${input[0]}`);
        rl.prompt();
        return;
    })
}
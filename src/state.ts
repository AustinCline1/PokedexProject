import {createInterface, type Interface} from "node:readline";
import {getCommands} from "./command.js";
import {PokeAPI} from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string,CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(cacheInterval: number): State {
    return {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        pokeapi: new PokeAPI(cacheInterval),
        nextLocationsURL: "",
        prevLocationsURL: "",
    }
}



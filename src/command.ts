import {command_help} from "./command_help.js";
import {command_exit} from "./command_exit.js";
import {command_map, command_mapb} from "./command_map.js";
import {command_explore} from "./command_explore.js";
import {command_catch} from "./command_catch.js";
import {command_inspect} from "./command_inspect.js";
import {command_pokedex} from "./command_pokedex.js";

import type {CLICommand} from "./state.js";

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
        map: {
            name: "map",
            description: "Map through locations",
            callback: command_map,
        },
        mapb: {
            name: "mapb",
            description: "Map back to the previous 20 locations",
            callback: command_mapb,
        },
        explore: {
            name: "explore",
            description: "Search for pokemon with a location",
            callback: command_explore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a pokemon",
            callback: command_catch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a pokemon",
            callback: command_inspect,
        },
        pokedex: {
            name: "pokedex",
            description: "List all pokemon caught",
            callback: command_pokedex,
        }
    }
}
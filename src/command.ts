import {command_help} from "./command_help.js";
import {command_exit} from "./command_exit.js";
import {command_map, command_mapb} from "./command_map.js";

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
        }
    }
}
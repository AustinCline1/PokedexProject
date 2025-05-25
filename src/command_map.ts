import {State} from "./state.js";

export async function command_map(state: State): Promise<void> {
    const response = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
    for (const location of response.results) {
        console.log(location.name);
    }
}
export async function command_mapb(state: State): Promise<void> {
    if(!state.prevLocationsURL) {
        throw new Error("No previous locations to map back to");
    }
    const response = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

    for (const location of response.results) {
        console.log(location.name);
    }
}
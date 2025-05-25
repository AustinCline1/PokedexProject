export type CacheEntry<T> = {
    createdAt: number;
    value: T;
}

export class Cache {
    #cache = new Map<string,CacheEntry<any>>();
    #replIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    get<T>(key: string) {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.value as T;
        }
        return undefined;
    }
    set<T>(key: string, value: T) {
       const entry: CacheEntry<T> = {
           createdAt: Date.now(),
           value: value,
       };
       this.#cache.set(key, entry);
    }

    #reap(){
        for(const key of this.#cache.keys()) {
            const entry = this.#cache.get(key);
            if(entry && Date.now()- entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#replIntervalId = setInterval(() => {this.#reap}, this.#interval);
    }

    stopReapLoop() {
        if(!this.#replIntervalId) {
            clearInterval(this.#interval);
            this.#replIntervalId = undefined;
        }
    }
}
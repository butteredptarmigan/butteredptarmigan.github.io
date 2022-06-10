export class Fetcher<T> {
    protected root = 'https://gnikdroy.pythonanywhere.com/api/';
    protected resource: string;
    protected count?: number;
    protected limit?: number;
    protected results?: Array<T>;

    constructor(resource: string) {
        this.resource = resource;
    }

    get url(): string {
        return this.root + this.resource;
    }

    protected async doFetch(url: string, unpack=true) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (unpack) {
                return data.results;
            }

            return data;
        } catch (error) {
            //TODO throw an appriopriate exception
            console.log(error);
        }
    }

    async fetch(): Promise<T[] | undefined> {
        return await this.doFetch(this.url);
    }

    async search(query: string) {
        const url = this.url + '?search=' + query;
        return await this.doFetch(url);
    }

    async fetchOne(id: number | string) {
        const url = this.url + '/' + id;
        return await this.doFetch(url, false);
    }

    async fetchCollection(ids: number[] | string[]) {
        const promises = ids.map(
            (id) => this.fetchOne(id)
        );
        const settled = await Promise.allSettled(promises);
        const collection = settled.map(
            (promise) => 'value' in promise ? promise.value : undefined
        );
        return collection;
    }
}
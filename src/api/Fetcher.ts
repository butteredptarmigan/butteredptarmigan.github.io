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

    protected async doFetch(
        url: string,
        { page=undefined, unpack=true }: { page?: number, unpack?: boolean } = {}
    ) {
        try {
            console.log(page);
            if (page !== undefined) {
                url += '?page=' + page;
            }

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

    async fetch(
        { page: page=undefined }: { page?: number } = {}
    ): Promise<T[] | undefined> {
        return await this.doFetch(this.url, { page });
    }

    async search(
        query: string,
        { page: page=undefined }: { page?: number } = {}
    ): Promise<T[] | undefined> {
        const url = this.url + '?search=' + query;
        return await this.doFetch(url, { page });
    }

    async fetchOne(id: number | string): Promise<T | undefined> {
        const url = this.url + '/' + id;
        return await this.doFetch(url, { unpack: false });
    }

    async fetchCollection(
        ids: number[] | string[],
        { page: page=undefined, limit: limit=10 }: { page?: number, limit?: number } = {}
    ) {
        const [start, end] =
            (page === undefined)
                ? [0, limit - 1]
                : [page * limit, (page + 1) * limit - 1];
        const identifiers = ids.slice(start, end);

        const promises = identifiers.map(
            (id) => this.fetchOne(id)
        );
        const settled = await Promise.allSettled(promises);
        const collection = settled.map(
            (promise) => 'value' in promise ? promise.value : undefined
        );
        
        return collection;
    }
}
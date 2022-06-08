import { ResponseData } from '../api/types';

export class Fetcher<T> {
    protected root = 'https://gnikdroy.pythonanywhere.com/api/';
    //TODO
    protected resource: string;
    protected next?: string;
    protected prev?: string;
    protected count?: number;
    protected results?: Array<T>;
    protected limit?: number;
    protected data: ResponseData<T>;

    constructor(resource: string) {
        this.resource = resource;
        this.data = {
            count: 0,
            results: []
        };
    }

    public get url(): string {
        return this.root + this.resource;
    }


    async fetch(url?: string): Promise<ResponseData<T> | undefined> {
        try {
            const response = await fetch(url ? url : this.url);
            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);

            //TODO throw an appriopriate exception
            return new Promise(() => undefined);
        }
    }

    async search(query: string) {
        const url = this.url + '?search=' + query;
        const data = await this.fetch(url);

        return data;
    }
}
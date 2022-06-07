export type ResponseData<T> = {
    count: number,
    next?: string,
    previous?: string,
    results: T[]
};

export type Agent = {
    id: number,
    person: string,
    type: string
};

export type Resource = {
    id: number,
    uri: string,
    type: string
};

export type Book = {
    id: number,
    title: string,
    description: string,
    downloads: number,
    agents: Agent[],
    resources: Resource[],
    bookshelves: string[],
    languages: string[]
};
import React from 'react';
import { Book as BookInterface, ResponseData } from '../api/types';
import { getBooks } from '../api/book';
import { Fetcher } from './Fetcher';
import { withSearchParams } from '../utils/router-utils';
import { SearchInput } from './SearchInput';
import Tab from '../Tab';

type ExploreProps = {
    searchParams: any,
    setSearchParams: Function
}

type ExploreState = {
    books: BookInterface[],
    favorites: Array<number>
}

class Explore extends React.Component<ExploreProps, ExploreState> {
    private fetcher: Fetcher<BookInterface>;

    constructor(props: ExploreProps) {
        super(props);
        this.state = {
            books: [],
            favorites: []
        }
        this.fetcher = new Fetcher('book'); //REF Dependency Injection
    }
    
    public get query(): string | undefined {
        return this.props.searchParams.get('query');
    }

    public set query(query: string | undefined) {
        this.props.setSearchParams(query ? { query } : {});
    }

    async componentDidMount() {
        try {
            this.query
                ? this.search(this.query)
                : this.fetch();
        } catch (error) {
            console.log(error); //TODO
        }
    }

    render() {
        if (!this.state.books) {
            //TODO
            console.log(this.query
                ? 'show "no results match your query" screen'
                : 'show "loading" screen'
            );
        }

        return (
            <Tab className='Explore'>
                <h1>Explore</h1>
                <SearchInput
                    query={this.query}
                    setQuery={(query?: string) => {
                        this.query = query;
                        this.search(query);
                    }}
                />
                <ul>
                    {this.state.books.map(book => (
                        <li key={book.id}>
                            <h4>{book.title}</h4>
                        </li>
                    ))}
                </ul>
            </Tab>
        );
    }

    async fetch() {
        const data = await this.fetcher.fetch();
        this.updateBooks(data);
    }

    async search(query?: string) {
        const data = await this.fetcher.search(query ? query : '');
        this.updateBooks(data);
    }

    updateBooks(data?: ResponseData<BookInterface>) {
        console.log(data); //TODO
        this.setState({
            books: data ? getBooks(data) : []
        });
    }
}

export default withSearchParams(Explore);
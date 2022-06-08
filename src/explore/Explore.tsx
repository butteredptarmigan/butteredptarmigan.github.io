import React from 'react';
import { Book as BookInterface, ResponseData } from '../api/types';
import { getBooks } from '../api/book';
import { Fetcher } from './Fetcher';
import Tab from '../Tab';

type ExploreState = {
    books: BookInterface[],
    favorites: Array<number>
}

class Explore extends React.Component<{}, ExploreState> {
    private fetcher: Fetcher<BookInterface>;

    constructor(props: {}) {
        super(props);
        this.state = {
            books: [],
            favorites: []
        }
        this.fetcher = new Fetcher('book'); //REF Dependency Injection
    }

    async componentDidMount() {
        try {
            this.fetch();
        } catch (error) {
            console.log(error); //TODO
        }
    }

    render() {
        return (
            <Tab className='Explore'>
                <h1>Explore</h1>
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

    updateBooks(data?: ResponseData<BookInterface>) {
        this.setState({
            books: data ? getBooks(data) : []
        });
    }
}

export default Explore;
import React from 'react';
import { Book as BookInterface, ResponseData } from '../api/types';
import { getBooks } from '../api/book';
import Tab from '../Tab';

class Explore extends React.Component<{}, {data: ResponseData<BookInterface>, books: BookInterface[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: {
                count: 0,
                results: []
            },
            books: []
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://gnikdroy.pythonanywhere.com/api/book/');

            const data = await response.json();
            const books = getBooks(data);

            console.log(books); //TODO
            
            this.setState({
                data: data,
                books: books
            });
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
}

export default Explore;
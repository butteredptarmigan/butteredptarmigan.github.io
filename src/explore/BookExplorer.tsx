import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book as BookInterface, ResponseData } from '../api/types';
import { getBooks } from '../api/book';
import Book from '../book/Book';
import Toolbar from '../book/Toolbar';
import './BookExplorer.scss';
import { Fetcher } from './Fetcher';

const Loading = ($: React.PropsWithChildren<any>) => (
    <div>{$.children}</div>
);

//TODO type
const BookExplorer = ($: any) => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks]: [BookInterface[], Function] = useState([]);
    const [searchParams, _setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    const updateBooks = (data: ResponseData<BookInterface>) => {
        const books = getBooks(data);
        setBooks(books);
    }

    const loadBooks = async (fn: () => Promise<ResponseData<BookInterface>>) => {
        setLoading(true);
        updateBooks(await fn());
        setLoading(false);
    }

    const fetch = async () => loadBooks(
        async () => await $.fetcher.fetch()
    );

    const search = async (query?: string) => loadBooks(
        async () => await $.fetcher.search(query)
    );

    useEffect(() => {
        query ? search(query) : fetch()
    }, [query]);

    //TODO format
    return (
        <section className='BookExplorer'>
            <ul className='BookExplorer-books'>
                {loading
                    ? <Loading>
                        {query
                            ? 'Our bookworms are searching...'
                            : 'Loading books...'}
                      </Loading>
                    : books.map((book: BookInterface) => (
                        <li key={book.id} className='container'>
                            <Book {...book}>
                                <Toolbar
                                    isFavorite={$.favorites.includes(book.id)}
                                    favoriteAction={() => $.favorites.toggle(book.id)}
                                    readAction={() => console.log(`Read ${book.id}`) /* TODO */}
                                />
                            </Book>
                        </li>
                      ))
                }
            </ul>
        </section>
    );
}

export default BookExplorer;
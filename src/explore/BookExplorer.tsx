import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Fetcher } from './Fetcher';
import { StorageOperator } from '../storage/Storage';
import { Book as BookInterface } from '../api/types';
import classNames from 'classnames';
import Book from '../book/Book';
import Toolbar from '../book/Toolbar';
import './BookExplorer.scss';

type FillerProps = React.PropsWithChildren<any>;

//REF generalize
const Filler = ($: FillerProps) => (
    <div className={classNames('Filler', $.className)}>
        <p>{$.children}</p>
    </div>
)

const Loading = ($: FillerProps) => (
    <Filler className='Loading'>
        {$.children}
    </Filler>
);

const Empty = ($: FillerProps) => (
    <Filler className='Empty'>
        {$.children}
    </Filler>
);

type BookExplorerProps = {
    showFavorites?: boolean
};

type BookExplorerContext = {
    favorites: StorageOperator,
    fetcher: Fetcher<BookInterface>
}

const BookExplorer = ($: BookExplorerProps) => {
    const { favorites, fetcher } = useOutletContext<BookExplorerContext>();
    const [loading, setLoading] = useState(false);
    const [books, setBooks]: [BookInterface[], Function] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const loadBooks = async (fn: () => Promise<any>) => {
        setLoading(true);
        setBooks(await fn());
        setLoading(false);
    }

    const fetch = async () => loadBooks(
        async () => await fetcher.fetch()
    );

    const search = async (query: string) => loadBooks(
        async () => await fetcher.search(query)
    );

    const fetchFavorites = async () => loadBooks(
        async () => await fetcher.fetchCollection(
            Object.keys(favorites.items)
        )
    );

    useEffect(() => {
        if ($.showFavorites) {
            fetchFavorites();
            return;
        }
        query ? search(query) : fetch()
    }, [query, $.showFavorites]);

    //TODO format and refactor this spaghetti monster
    return (
        <section className='BookExplorer'>
            <ul className='BookExplorer-books'>
                {loading
                    ? <Loading>
                        {query
                            ? 'Our bookworms are searching...'
                            : 'Loading books...'}
                      </Loading>
                    : books && books.length
                        ? books.map((book: BookInterface) => (
                            <li key={book.id} className='container'>
                                <Book {...book}>
                                    <Toolbar
                                        isFavorite={favorites.includes(book.id)}
                                        favoriteAction={() => favorites.toggle(book.id)}
                                        readAction={() => console.log(`Read ${book.id}`) /* TODO */}
                                    />
                                </Book>
                            </li>
                          ))
                        : <Empty>
                            {$.showFavorites
                                ? 'There are no books here yet. Mark books as favourite and get back to them easily using this tab.'
                                : 'Something went wrong. Plase try again soon.'}
                          </Empty>
                }
            </ul>
        </section>
    );
}

export default BookExplorer;
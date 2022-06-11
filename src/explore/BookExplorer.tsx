import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Fetcher } from '../api/Fetcher';
import { StorageOperator } from '../storage/Storage';
import { Book as BookInterface } from '../api/types';
import Book from '../book/Book';
import Toolbar from '../book/Toolbar';
import { Loading, Empty } from '../ui/Filler';
import './BookExplorer.scss';

type BookExplorerProps = {
    favorites: StorageOperator,
    fetcher: Fetcher<BookInterface>,
    showFavorites?: boolean,
    setPaginationVisibility: Function
};

const BookExplorer = ($: BookExplorerProps) => {
    const { favorites, fetcher } = $;
    const [loading, setLoading] = useState(false);
    const [books, setBooks]: [BookInterface[], Function] = useState([]);
    const { page } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const navigate = useNavigate();

    const loadBooks = async (fn: () => Promise<any>) => {
        setLoading(true);
        setBooks(await fn());
        setLoading(false);
    }

    const fetch = async (page?: number) => loadBooks(
        async () => await fetcher.fetch({ page })
    );

    const search = async (query: string) => loadBooks(
        async () => await fetcher.search(query)
    );

    const fetchFavorites = async (page?: number) => loadBooks(
        async () => await fetcher.fetchCollection(
            favorites.orderedItems,
            { page }
        )
    );

    useEffect(() => {
        const pageNumber = page ? Number(page) : undefined;

        if ($.showFavorites) {
            fetchFavorites(pageNumber);
            return;
        }
        query ? search(query) : fetch(pageNumber);
    }, [page, query, $.showFavorites]);

    const hasBooks = books && books.length;

    useEffect(() => {
        $.setPaginationVisibility(hasBooks);
    }, [hasBooks]);

    const LoadingFiller = () => (
        <Loading>
            {query
                ? 'Our bookworms are searching...'
                : 'Loading books...'}
        </Loading>
    );

    const EmptyFiller = () => (
        <Empty>
            {$.showFavorites
                ? 'There are no books here yet. Mark books as favourite and get back to them easily using this tab.'
                : 'Something went wrong. Plase try again soon.'}
        </Empty> 
    );

    const Books = () => (
        <>
            {books.map((book: BookInterface) => (
                <li key={book.id} className='container'>
                    <Book {...book}>
                        <Toolbar
                            isFavorite={favorites.includes(book.id)}
                            favoriteAction={() => favorites.toggle(book.id)}
                            readAction={() => navigate(`/room/${book.id}`)}
                        />
                    </Book>
                </li>
            ))}
        </>
    );

    return (
        <section className='BookExplorer'>
            <ul className='BookExplorer-books'>
                {loading
                    ? <LoadingFiller/>
                    : hasBooks
                        ? <Books/>
                        : <EmptyFiller/>}
            </ul>
        </section>
    );
}

export default BookExplorer;
import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Book as BookInterface } from '../api/types';
import { getResource } from '../api/book';
import { Fetcher } from '../api/Fetcher';
import Tab from '../Tab';
import './ReadingRoom.scss';

const ReadingRoom = () => {
    return (
        <Tab className='ReadingRoom'>
            <Routes>
                <Route index element={<div>Select a book using the Explore tab and read it here.</div>}/>
                <Route path=':bookId' element={<Reader/>}/>
            </Routes>
        </Tab>
    );
};

const Reader = () => {
    let { bookId } = useParams();
    const [fetcher] = useState(() => new Fetcher<BookInterface>('book'));
    const [source, setSource] = useState('');

    const fetch = async (id: string | number) => {
        const book = await fetcher.fetchOne(id);
        const resource = getResource(book, 'text/html');
        const source = resource?.uri;
        setSource(source || '');
    };
    
    useEffect(() => {
        fetch(bookId as string);
    }, [bookId]);

    return (
        <iframe src={source}/>
    );
}

export default ReadingRoom;
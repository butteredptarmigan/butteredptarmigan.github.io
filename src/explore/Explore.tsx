import React from 'react';
import { Book as BookInterface } from '../api/types';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from './Fetcher';
import { useOutletContext } from 'react-router-dom';
import Tab from '../Tab';
import { SearchInput } from './SearchInput';
import BookExplorer from './BookExplorer';
import './Explore.scss';

//TODO
const fetcher = new Fetcher('book');

const Explore = () => {
    const context: { favorites: StorageOperator } = useOutletContext();

    return (
        <Tab className='Explore'>
            <h1>Explore</h1>
            <SearchInput/>
            <BookExplorer
                fetcher={fetcher}
                favorites={context.favorites}
            />
        </Tab>
    );
}

export default Explore;
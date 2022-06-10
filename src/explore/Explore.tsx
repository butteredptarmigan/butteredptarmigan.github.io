import React, { useState } from 'react';
import { Book as BookInterface } from '../api/types';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from './Fetcher';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import Tab from '../Tab';
import { SearchInput } from './SearchInput';
import I from '../ui/Icon';
import './Explore.scss';

const ShowFavorites = () => (
    <Link to='/explore/favorites' className='ShowFavorites'>
        <I>favorite</I>
    </Link>
);

const Explore = () => {
    const [fetcher] = useState(() => new Fetcher('book'));
    const { favorites } = useOutletContext<{favorites: StorageOperator}>();

    return (
        <Tab className='Explore'>
            <header className='Explore-header'>
                <ShowFavorites/>
                <h1>Explore</h1>
                <SearchInput/>
            </header>
            <Outlet context={{ fetcher, favorites }}/>
        </Tab>
    );
}

export default Explore;
import { useState } from 'react';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from './Fetcher';
import { Outlet, useOutletContext } from 'react-router-dom';
import Tab from '../Tab';
import { SearchInput } from './SearchInput';
import './Explore.scss';
import { ShowFavorites } from './ShowFavorites';

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
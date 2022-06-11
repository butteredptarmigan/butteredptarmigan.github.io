import { useState } from 'react';
import { Route, Routes, useOutletContext } from 'react-router-dom';
import { Book as BookInterface } from '../api/types';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from '../api/Fetcher';
import Tab from '../Tab';
import SearchInput from './SearchInput';
import ShowFavorites from './ShowFavorites';
import BookExplorer from './BookExplorer';
import './Explore.scss';

type ContainerType = Partial<React.ReactHTMLElement<HTMLDivElement>>;

const Container = ($: React.PropsWithChildren<ContainerType>) => (
    <div className='container'>{$.children}</div>
);

const Explore = () => {
    const [fetcher] = useState(() => new Fetcher<BookInterface>('book'));
    const { favorites } = useOutletContext<{favorites: StorageOperator}>();
    const explorerProps = { fetcher, favorites };

    return (
        <Tab className='Explore'>
            <Container>
                <header className='Explore-header'>
                    <Container>
                        <Container>
                            <ShowFavorites/>
                        </Container>
                        <h1>Explore</h1>
                        <Container>
                            <SearchInput/>
                        </Container>
                    </Container>
                </header>
                <Routes>
                    <Route index element={<BookExplorer {...explorerProps}/>}/>
                    <Route path='favorites' element={<BookExplorer showFavorites {...explorerProps}/>}/>
                </Routes>
            </Container>
        </Tab>
    );
}

export default Explore;
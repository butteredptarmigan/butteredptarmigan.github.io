import { useState } from 'react';
import { Route, Routes, useOutletContext } from 'react-router-dom';
import { Book as BookInterface } from '../api/types';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from '../api/Fetcher';
import Tab from '../Tab';
import SearchInput from './SearchInput';
import ShowFavorites from './ShowFavorites';
import BookExplorer from './BookExplorer';
import Pagination from '../pagination/Pagination';
import './Explore.scss';

type ContainerType = Partial<React.ReactHTMLElement<HTMLDivElement>>;

const Container = ($: React.PropsWithChildren<ContainerType>) => (
    <div className='container'>{$.children}</div>
);

const Explore = () => {
    const [fetcher] = useState(() => new Fetcher<BookInterface>('book'));
    const { favorites } = useOutletContext<{favorites: StorageOperator}>();
    const [showPagination, setPaginationVisibility] = useState(false);
    const explorerProps = { fetcher, favorites, setPaginationVisibility };

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
                    <Route path='favorites'>
                        <Route index element={<BookExplorer showFavorites {...explorerProps}/>}/>
                        <Route path=':page' element={<BookExplorer showFavorites {...explorerProps}/>}/>
                    </Route>
                    <Route path=':page' element={<BookExplorer {...explorerProps}/>}/>
                </Routes>
                {showPagination
                    ? <Pagination count={10}/>
                    : null}
            </Container>
        </Tab>
    );
}

export default Explore;
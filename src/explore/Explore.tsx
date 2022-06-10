import { useState } from 'react';
import { StorageOperator } from '../storage/Storage';
import { Fetcher } from './Fetcher';
import { Outlet, useOutletContext } from 'react-router-dom';
import Tab from '../Tab';
import { SearchInput } from './SearchInput';
import './Explore.scss';
import { ShowFavorites } from './ShowFavorites';

type ContainerType = Partial<React.ReactHTMLElement<HTMLDivElement>>;

const Container = ($: React.PropsWithChildren<ContainerType>) => (
    <div className='container'>{$.children}</div>
);

const Explore = () => {
    const [fetcher] = useState(() => new Fetcher('book'));
    const { favorites } = useOutletContext<{favorites: StorageOperator}>();

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
                <Outlet context={{ fetcher, favorites }}/>
            </Container>
        </Tab>
    );
}

export default Explore;
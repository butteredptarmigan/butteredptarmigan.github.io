import { NavLink, NavLinkProps, Outlet } from 'react-router-dom';
import DatewiseStorage, { StorageOperator } from './storage/Storage';
import './App.scss';

const TabLink = ($: NavLinkProps) => (
    <NavLink
        {...$}
        className={(isActive) => isActive ? 'TabLink-active' : ''}
    >
        {$.children}
    </NavLink>
);

const App = () => (
    <div className='App'>
        <aside className='App-aside'>
            <header>
                <h1 className='App-title'>Gutenberg reader</h1>
            </header>
            <nav className='App-nav'>
                <TabLink to='/' end>Dashboard</TabLink>
                <TabLink to='/explore'>Explore</TabLink>
                <TabLink to='/room'>Reading room</TabLink>
            </nav>
        </aside>
        <DatewiseStorage>
            {(favorites: StorageOperator) => (
                <Outlet context={{
                    favorites: favorites
                }}/>
            )}
        </DatewiseStorage>
    </div>
);

export default App;
import { Link, Outlet } from 'react-router-dom';
import DatewiseStorage, { StorageOperator } from './storage/Storage';

const App = () => (
    <div className='App'>
        <aside>
            <header>
                <h1 className='App-title'>Gutenberg reader</h1>
            </header>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/explore'>Explore</Link>
                <Link to='/room'>Reading room</Link>
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
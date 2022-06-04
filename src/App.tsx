import { Link, Outlet } from 'react-router-dom';

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
        <Outlet/>
    </div>
);

export default App;
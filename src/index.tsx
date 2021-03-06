import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './dashboard/Dashboard';
import Explore from './explore/Explore';
import ReadingRoom from './reading-room/ReadingRoom';
import Tab from './Tab';
import { Empty } from './ui/Filler';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<App/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='explore/*' element={<Explore/>}/>
            <Route path='room/*' element={<ReadingRoom/>}/>
            <Route path='*' element={
                <Tab className='Error'>
                    <Empty>404! There is nothing here.</Empty>
                </Tab>}
            />
        </Route>
    </Routes>
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <AppRoutes/>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
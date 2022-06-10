import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './dashboard/Dashboard';
import Explore from './explore/Explore';
import BookExplorer from './explore/BookExplorer';
import ReadingRoom from './reading-room/ReadingRoom';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<App/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='explore' element={<Explore/>}>
                <Route index element={<BookExplorer/>}/>
                <Route path='favorites' element={<BookExplorer showFavorites/>}/>
            </Route>
            <Route path='room' element={<ReadingRoom/>}/>
        </Route>
    </Routes>
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
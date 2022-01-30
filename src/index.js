import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Moralis from 'moralis/dist/moralis.min.js';

import './index.css';
import Login from './pages/Login';
import Account from './pages/Account';
import Explore from './pages/Explore';
import Collection from './pages/Collection';
import NFTpage from "./pages/NFTpage";

const serverUrl = "https://a8kyvifx3fa2.usemoralis.com:2053/server";
const appId = "NZgHcC9ZnV8RB4meNsSkXQX85Zlg7la9vM4VxTYo";
Moralis.start({ serverUrl, appId });

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/collection/:slug" element={<Collection />} />
                <Route path="/assets/:address/:id" element={<NFTpage />} />
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

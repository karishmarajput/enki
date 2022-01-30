import * as React from "react";
import { useNavigate } from "react-router-dom";

import Moralis from 'moralis/dist/moralis.min.js';

import Header from "../components/Header";

import './Account.css';

export default function Account() {
    const navigate = useNavigate();

    let user = Moralis.User.current();

    // Redirect user to homepage if not logged in.
    if (!user) navigate("/");

    const owner = user.get("ethAddress");
    const url = `https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=20`;
    console.log(url);

    return (
        <div >
            <Header />
            <h1>Collections</h1>
        </div>
    );
}

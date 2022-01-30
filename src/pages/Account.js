import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

import Moralis from 'moralis/dist/moralis.min.js';
import Header from "../components/Header";

import CollectionCard from "../components/CollectionCard";

import './Collection.css';
import './Account.css';

export default function Account() {
    const [nfts, setNfts] = useState([]);

    const navigate = useNavigate();

    let user = Moralis.User.current();

    // Redirect user to homepage if not logged in.
    if (!user) navigate("/");

    const owner = user.get("ethAddress");
    const url = `https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=20`;
    console.log(url);

    useEffect(() => {
        getNFTs();
    }, []);

    function getNFTs() {
        const limit = 20;
        let URLNfts = `https://testnets-api.opensea.io/api/v1/assets?&offset=${0}&limit=${limit}&owner=${owner}`;
        fetch(URLNfts)
            .then(response => response.json())
            .then(data => {
                setNfts(data.assets);
                console.log(data.assets);
            });
    }

    return (
        <div>
          <Header />
          <h1>User Owned NFTs</h1>
            <div className="collection-card-wrapper">
              {
                    nfts.map((nft) => {
                        return (
                            <CollectionCard
                              title={nft.name}
                              image={nft.image_preview_url}
                              text={nft.description}
                              key={nft.name} />
                        );
                    })
                }
            </div>
        </div>
    );
}

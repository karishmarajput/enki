import * as React from "react";
import data from "./nftdata.json";

import Moralis from 'moralis/dist/moralis.min.js';

import Header from "../components/Header";

import './NFTpage.css';

export default function NFTpage() {
    let user = Moralis.User.current();

    const owner = user.get("ethAddress");

    const url = "https://api.opensea.io/api/v1/asset/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1/";
    console.log(url);
    //    let data;
    //    fetch(url)
    //         .then(async response => {
    //             data = await response.json();
    //             console.log(data);
    //         })
    //         .catch(e=>console.log(e));


    return (
        <div >
          <Header />
            <h1>{data.name}</h1>
            <div className="Nft-page-header">
                <div className="header-image-div">
                    <img src={data.image_url}></img>
                    <div className="description-div">
                        <h3>Description</h3>

                        <div className="summary-div">

                            <details>
                                <summary>About {data.name}</summary>
                                <p><img src={data.asset_contract.image_url}></img> <br />{data.asset_contract.description}</p>
                            </details>

                        </div>
                        <div className="summary-div">

                            <details>
                                <summary>Details</summary>
                                <p>

                                    Contract Address: {data.asset_contract.address}<br />
                                    Token ID: {data.token_id}

                                </p>
                            </details>
                        </div>
                    </div>

                </div>
                <div className="header-contain-div">

                    <h4>Owned by {data.owner.address}</h4>
                    <div className="summary-div">
                        <details>
                            <summary>Prize History</summary>
                            <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                        </details>
                    </div>
                    <div className="summary-div">
                        <details>
                            <summary>Listings</summary>
                            <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                        </details>
                    </div>
                    <div className="summary-div">
                        <details>
                            <summary>Offers</summary>
                            <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                        </details>
                    </div>
                </div>

            </div>
            <div>
                <div className="summary-div">
                    <details>
                        <summary>Items Activity</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                </div>

            </div>
        </div>
    )
}

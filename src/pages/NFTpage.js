import * as React from "react";

import Moralis from 'moralis/dist/moralis.min.js';

import Header from "../components/Header";

import Button from '@mui/material/Button';
import Fingerprint from '@mui/icons-material/Fingerprint';

import './NFTpage.css';
import {useParams} from "react-router-dom";
import {useEffect, useState, useMemo } from "react";
import { useMoralis } from "react-moralis";

export default function NFTpage() {
    let user = Moralis.User.current();
    let {
		enableWeb3,
		isInitialized,
		isAuthenticated,
		isWeb3Enabled,
	} = useMoralis();

    useEffect(() => {
		if (isInitialized) {
			Moralis.initPlugins();
		}
	}, []);
    if(user){
        isAuthenticated= true;
    }
    console.log(isAuthenticated);
    const owner = user.get("ethAddress");
    const [data, setData] = useState(undefined)
    const {address} = useParams();
    const {id} = useParams();
    console.log(data)

    useEffect(() => {
        const url = `https://testnets-api.opensea.io/api/v1/asset/${address}/${id}/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, [])
    const web3Account = useMemo(
		() => isAuthenticated && user.get("accounts")[0],
		[user, isAuthenticated],
	);
    const createBuyOrder = async () => {
		await Moralis.Plugins.opensea.createBuyOrder({
			network: "testnet",
			tokenAddress: address,
			tokenId: id,
			tokenType: "ERC721",
			amount: 0.0001,
			userAddress: web3Account,
			paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
		}).then(response =>{
            alert("Buy Order Successful");
            console.log(response);
        }).catch(e => {      
            alert(e)
        });
	};


	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled) {
			enableWeb3();
		}
	}, [isAuthenticated]);
    return (
        <div>
            <Header/>

            {data !== undefined && (
                <div>
                    <h1>{data.name}</h1>
                    <div className="Nft-page-header">
                        <div className="header-image-div">
                            <img src={data.image_url}></img>
                            <div className="description-div">
                                <h3>Description</h3><hr/>
                                <p>{data.description}</p>
                                <div className="summary-div">

                                    <details>
                                        <summary>About {data.name}</summary>
                                        <p>
                                            
                                                <img className="description-image" src={data.asset_contract.image_url}></img>
                                                <br/><br/>{data.asset_contract.description}
                                        
                                        </p>
                                    </details>

                                </div>
                                <div className="summary-div">

                                    <details>
                                        <summary>Details</summary>
                                        <p>

                                            Contract Address: {data.asset_contract.address}<br/><br/>
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
                                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
                                        international pavilions, award-winning fireworks and seasonal special
                                        events.</p>
                                </details>
                            </div>
                            <div className="summary-div">
                                <details>
                                    <summary>Listings</summary>
                                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
                                        international pavilions, award-winning fireworks and seasonal special
                                        events.</p>
                                </details>
                            </div>
                            <div className="summary-div">
                                <details>
                                    <summary>Offers</summary>
                                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
                                        international pavilions, award-winning fireworks and seasonal special
                                        events.</p>
                                </details>
                            </div>
                            {isAuthenticated && (
                                <>
                                    <Button onClick={createBuyOrder} variant="contained" endIcon={<Fingerprint />}>
                                        Buy Now
                                    </Button>
                                </>
                            )}
                        </div>

                    </div>
                    <div>
                        <div className="summary-div">
                            <details>
                                <summary>Items Activity</summary>
                                <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
                                    international pavilions, award-winning fireworks and seasonal special events.</p>
                            </details>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

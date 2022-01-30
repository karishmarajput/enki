import React, {useEffect, useState} from 'react';

import Header from "../components/Header";
import ExploreCard from "../components/ExploreCard";

import './Explore.css';

// const topCollections = [
//     "opensea-creature-sale",
//     "star-girl",
//     "michael-polygon-verified",
//     "opensea-creature-lootbox",
//     "opensea-creatures-m2cqu6opbw",
//     "cryptokittiesrinkeby",
//     "rinkebydsds",
//     "bricks",
//     "mutant-ape-yacht-club0002",
//     "boredapes",
//     "doodles-c50urtqkjz",
//     "test-horses-dzuo9jwrhe",
//     "secretturtlesociety-v2",
//     "the-greed-games",
//     "the-rapscallions-vc8w33w0wq",
// ];

export default function Explore() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const limit = 20;
        let offset = 0;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.opensea.io/api/v1/collections?offset=${offset}&limit=${limit}`, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.response);
                const xyz = JSON.parse(xhr.response);
                setCollections(xyz.collections);
            }
        };
        xhr.onerror = function() { // only triggers if the request couldn't be made at all
            alert(`Network Error`);
        };
        xhr.send();
    }, []);

    return (
        <div className="explore-card-wrapper">
          <Header />
          <ExploreCard
            title="Star Girl"
            image="https://storage.googleapis.com/opensea-rinkeby/0x83539759905d088905d63bcd8828b9f6b7e928f1.png"
            text="Fashion makes the world go round!\r\nCollect the most fab, most fashionable, most gorgeous fashion items!"
            slug="star-girl"
          />
          {
                collections.map((collection) => {
                    return (
                        <ExploreCard
                            title={collection.name}
                            image={collection.banner_image_url}
                            text={collection.description}
                            slug={collection.slug}
                        />
                    );
                })
          }
        </div>
    );

}

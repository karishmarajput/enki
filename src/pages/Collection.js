import React, {useEffect, useState} from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import Header from "../components/Header";
import CollectionCard from "../components/CollectionCard";

import './Collection.css';

export default function Collection() {
    const [nfts, setNfts] = useState([]);
    const [sortBy, setSortBy] = useState('sale_count');
    const [sortDirection, setSortDirection] = useState('desc');
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        getNFTs();
    }, []);

    useEffect(() => {
        setOffset(0);
        getNFTs();
        console.log(sortDirection);
        console.log(sortBy);
    }, [sortDirection, sortBy]);

    useEffect(() => {
        getMoreNFTs();
        console.log(offset);
    }, [offset]);

    function getNFTs() {
        const collection = 'doodles-official';
        const limit = 20;
        let URLNfts = `https://api.opensea.io/api/v1/assets?order_direction=${sortDirection}&offset=${offset}&limit=${limit}&collection=${collection}&order_by=${sortBy}`;
        fetch(URLNfts)
            .then(response => response.json())
            .then(data => {
                setNfts(data.assets);
                console.log(data.assets);
            });
    }

    function getMoreNFTs() {
        console.log(offset);
        const collection = 'doodles-official';
        const limit = 20;
        let URLNfts = `https://api.opensea.io/api/v1/assets?order_direction=${sortDirection}&offset=${offset}&limit=${limit}&collection=${collection}&order_by=${sortBy}`;
        fetch(URLNfts)
            .then(response => response.json())
            .then(data => {
                // let newArr = nfts
                // newArr.push(...data.assets)
                setNfts([...nfts,...data.assets]);
                // console.log(newArr)
            });
    }

    function sortByChange(event) {
        setSortBy(event.target.value)
    }

    function sortDirectionChange(event) {
        setSortDirection(event.target.value)
    }

    return (
        <div>
          <Header />
            <FormControl>
                <InputLabel id="sort-by-select-label">Sort by</InputLabel>
                <Select
                    labelId="sort-by-select-label"
                    id="sort-by-simple-select"
                    value={sortBy}
                    label="Sort by"
                    onChange={sortByChange}
                >
                    <MenuItem value="sale_date">Sale date</MenuItem>
                    <MenuItem value="sale_count">Sale count</MenuItem>
                    <MenuItem value="sale_price">Sale price</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="sort-direction-simple-select-label">Sort Direction</InputLabel>
                <Select
                    labelId="sort-direction-select-label"
                    id="sort-direction-simple-select"
                    value={sortDirection}
                    label="Sort Direction"
                    onChange={sortDirectionChange}
                >
                    <MenuItem value="desc">Descending</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                </Select>
            </FormControl>
            <div className="collection-card-wrapper">
                {nfts.map((nft) => {
                    return (
                        <CollectionCard title={nft.name} image={nft.image_preview_url} text={nft.description} key={nft.name}/>
                    )
                })}
            </div>
            <Button onClick={() => setOffset(offset + 1)} variant="contained" sx={{ mt: 3, mb: 2 }}>Load More</Button>
        </div>
    );
}

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import './CollectionCard.css';
import {useNavigate} from "react-router-dom";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CollectionCard(prop) {
    const navigate = useNavigate();
    function onNFTClick() {
        navigate(`/assets/${prop.address}/${prop.token_id}`);
    }

    return (
        <Card onClick={onNFTClick} sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={prop.title}
                // subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={prop.image}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {prop.text}
                </Typography>
            </CardContent>
        </Card>
    );
}

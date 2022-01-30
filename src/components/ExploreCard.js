import * as React from 'react';
import {useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ExploreCard(prop) {
    const navigate = useNavigate();

    function onCardClick() {
        navigate(`/collection/${prop.slug}`);
    }

    return (
        <Card sx={{ maxWidth: 345 }} onClick={onCardClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={prop.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {prop.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {prop.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

import TextField from '@mui/material/TextField';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect, Fragment } from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
function PostFeed() {
    const [searchBy, setSearchBy] = React.useState('');


    const url = "https://fmzdy563bcs2aw5jo6shmau3ty0coqao.lambda-url.us-east-1.on.aws/";
    var [links, setLinks] = useState([]);
    useEffect(() => {
        axios.post(`${url}`, { interests: 'Mountain,Ocean' })
        .then((response) => {
            const allData = response.data;
            console.log(allData.toString().split(","));
            setLinks(allData.toString().split(","));
        })
        .catch(error => console.error(`Error: ${error}`));
    }, []);

    let navigate = useNavigate();
    const onSumbit = () => {
        axios.post(`${url}`, { interests: searchBy })
            .then((response) => {
                const allData = response.data;
                console.log(allData.toString().split(","));
                setLinks(allData.toString().split(","));
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <Box sx={{ height: "100%", marginTop: "4%" }}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                E X P L O R E
            </Typography>
            <Box sx={{ height: "10%", display: 'flex', justifyContent: "center" }}>
                <Grid>
                    <Grid>
                        <TextField
                            value={searchBy}
                            name="searchBy"
                            id={searchBy}
                            onChange={(e) => setSearchBy(e?.target?.value)}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    onSumbit()
                                }
                            }}
                            label="Search By Item Name"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ height: "90%" }}>
                <Container sx={{ py: 1 }} maxWidth="md">
                    <Grid container spacing={4}>


                        {links.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    onClick={() => navigate("/view/post")}
                                >
                                    <CardMedia
                                        component="img"
                                        image={card}
                                        alt="random"
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
}

export default PostFeed;

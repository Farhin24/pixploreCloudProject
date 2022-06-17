import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Posts from './Posts';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Box, Grid } from '@mui/material';

function PostFeed() {
    const [searchBy, setSearchBy] = React.useState('');
    const [profiles, setProfiles] = React.useState([]);
    const [tempProfiles, setTempProfiles] = React.useState([]);

    //   const url = "https://tutorial4-api.herokuapp.com/api/users/";
    // const url = "https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/dataPostss";
    //   const url = "https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/dbposts";
    // const url = "https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/dataProfiles";
    const url = "https://raw.githubusercontent.com/11fenil11/DataAboutProject/main/dbpostdata";
    useEffect(() => {
        fetchAllData();
    }, []);

    // var allData = [];

    const fetchAllData = () => {
        axios.get(`${url}`)
            .then((response) => {
                const allData = response.data.data;
                setProfiles(allData);
                setTempProfiles(allData);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const onSumbit = () => {
        const newPosts = profiles.filter((profile) => profile.itemName.toLowerCase().indexOf(searchBy.toLowerCase()) > -1);
        // setPosts(newPosts);
        setTempProfiles(newPosts);
    }

    return (
        <Box sx={{ height: "100%", marginTop: "4%" }}>
            <Box sx={{ height: "10%", display: 'flex', justifyContent: "center" }}>
                {/* <Grid container spacing={1} sx={{ height: "100%", width: "100%" ,justifyContent: "center" }}>
                    <Grid item md={9} sx={{ marginLeft:'10%',height: "50%", width: "90%", marginTop: '1%' }}> */}
                    <Grid>
                    <Grid>
                        <TextField
                            value={searchBy}
                            name="searchBy"
                            // class="search"
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
                    {/* <Grid item md={3} sx={{  width: "10%", height:'50%' }}>
                        <Button variant="outlined" size='large' onClick={onSumbit}>Go</Button>
                    </Grid> */}
                </Grid>
            </Box>

            <Box sx={{ height: "90%" }}>
                <Posts profiles={tempProfiles} />
            </Box>

        </Box>
    );
}

export default PostFeed;

import react, { Fragment } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { margin } from '@mui/system';

function Posts(props) {

    let navigate = useNavigate();
    return (
            <Box sx={{ flexGrow: 1, margin: "2% 10% 10% 10%" }}>
                <Grid container spacing={4}>
                    {props.profiles.map((profile, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>

                            <Card sx={{
                                maxWidth: 'auto',
                                maxHeight: 'auto'

                            }} onClick={()=> navigate("/view/post")}>
                                <CardMedia                                
                                    component="img"
                                    height={'200'}
                                    image={profile.picture}
                                    alt="Profile Picture"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
    );
}

export default Posts;

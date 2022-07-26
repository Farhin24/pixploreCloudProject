
import React, { useRef, useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from "@mui/material/Box";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/user/feed">
        PixPlore : Explore your Interests
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function View() {

  const { route } = useAuthenticator(context => [context.route]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return route === 'authenticated' ? <Newview /> : <Login />;
}
const Newview = () => {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);
  const { user, signOut } = useAuthenticator((context) => [context.user]);


  useEffect(() => {
    console.log(user.username);
    axios.post('https://ggvb5ukil4fp2yfkcdvz4iyzfm0phqpk.lambda-url.us-east-1.on.aws/', {
      ImgId: location.state.id
    }).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error);
      })


  }, []);
  console.log(user.user_id);
  return (
    <>
      <Card sx={{ maxWidth: 800, margin: "2% auto 5% auto", float: "none", marginBottom: "10px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            width="400"
            image={location.state.id}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {
            axios.post("https://outku7xbn4d6fn33k4cdumriiq0kqvqb.lambda-url.us-east-1.on.aws/", {
              user_id: user.username,
              key: location.state.id
            });
            navigate("/user/feed")
          }
          } >
            SAVE
          </Button>
        </CardActions>
      </Card>
      <Box sx={{ bgcolor: "background.paper", p: 2 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Always Follow your dreams!
        </Typography>
        <Copyright />
      </Box>
    </>
  )
}
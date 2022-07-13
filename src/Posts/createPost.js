import React from "react";
import "../Posts/createPost.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//const cors = require('cors');
//app.use(cors());
import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
>>>>>>> fenil-dev

const Input = styled("input")({
  display: "none",
});


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
<<<<<<< HEAD
function CreatePost() {
=======
export default function CreatePost() {
  const { route } = useAuthenticator(context => [context.route]);
  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  return route === 'authenticated' ? <NewCreatePost />: <Login />;  
}
function NewCreatePost() {
>>>>>>> fenil-dev

  const [photo, setPhoto] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    
    
  

    axios.put("https://xqh1t1hyb4.execute-api.us-east-1.amazonaws.com/d1/pixploreimags/tst.jpg", photo)
    .then((result)=>{
      console.log(result.data);
    })
    .catch((err)=>
    {
      console.error(err);
    });
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: 3,
          maxWidth: "70%",
          maxHeight: "40%",
          margin: "2% auto 5% auto",
          borderRadius: 4,
        }}
      >
        <form method="post">
          <label className="label">
            Choose an image to upload from your system
          </label>
          <br />
          <TextField
            id="outlined-basic"
            label="Enter Image Title"
            variant="outlined"
            sx={{ width: "40%" }}
          />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Image Description here"
            multiline
            maxRows={4}
            sx={{ width: "40%" }}
          />
          <br />
          <Stack direction="row" alignItems="center" spacing={2}>

            <label htmlFor="photo">
              <Input accept="image/*" id="photo" type="file" value={photo}
                onChange={(event) => setPhoto(event.target.value)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <label htmlFor="contained-button-file">

              <Button variant="contained" component="span" onClick={onSubmit}>
                Submit
              </Button>
            </label>
          </Stack>
          <Container sx={{ py: 3 }}>
            <Card
              sx={{
                maxWidth: "30%",
                display: "flex",
                flexDirection: "column",
                margin: "2% auto 5% auto",
              }}
            >
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
                alt="random"
                height={400}
              />
            </Card>
          </Container>
        </form>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">        
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
      {/* End footer */}
    </>
  );
}


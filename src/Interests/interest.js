import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
<<<<<<< HEAD
=======
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";


export default function Interests() {
  const { route } = useAuthenticator(context => [context.route]);
  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  return route === 'authenticated' ? <NewInterests />: <Login />;  
}
>>>>>>> fenil-dev

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
function Interests() {
=======
function NewInterests() {
>>>>>>> fenil-dev
  const [data, setData] = useState('');

  useEffect(() => {
    handleSubmit()
  }, []);

  const handleSubmit = async() => {
    const newdata=new FormData();
    newdata.append("interests",data)
      // make axios post request
       axios.post("https://nlhhrt7ol4eniujfzhl743alz40zdtmw.lambda-url.us-east-1.on.aws/",
        {newdata:'farhin'}
      )
      .then((res)=>{
        console.log(res.data)
      })
    .catch((error)=> {
      console.log(error)
    });
  };
  
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          marginTop={"50px"}
          gutterBottom
        >
          What are you interested In?
        </Typography>
        <form onSubmit={handleSubmit}>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value={data}
          onChange={handleChange}
        >
          <FavoriteIcon />
         
        </Fab>

      
      <Button
        variant="contained"
        color="success"
        endIcon={<SendIcon />}
        style={{ marginLeft: "650px", marginTop: "50px" }}
        onClick={() => navigate("/user/feed")}
      
      >
        CONTINUE
      </Button></form></Container>
    
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          END
        </Typography>
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
  );
}
<<<<<<< HEAD

export default Interests;
=======
>>>>>>> fenil-dev

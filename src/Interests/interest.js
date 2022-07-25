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
import { useAuthenticator } from '@aws-amplify/ui-react';
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

function Interests() {
  const [data, setData] = useState('');
  const {user, signOut} = useAuthenticator((context) => [context.user]);
  let interestsObj = ""
  useEffect(() => {
    
  }, []);

  const handleSubmit = async() => {
   
    
      // make axios post request
      
       axios.post("https://nlhhrt7ol4eniujfzhl743alz40zdtmw.lambda-url.us-east-1.on.aws/",
        {user_id: user.username , interests: interestsObj.slice(0,interestsObj.length-1)}
      )
      .then((res)=>{
        console.log(res.data)
      })
    .catch((error)=> {
      console.log(error)
    });
    navigate("/user/feed")
  };
  
  const handleChange = (event) => {
    console.log("hi" + user.username);
    interestsObj=interestsObj+event.target.value+","
  
    console.log(interestsObj)
 
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
        <form >
          <table>
            <tr><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Landscape"
          onClick={handleChange}
        >Landscape
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Sea"
          onClick={handleChange}
        >Sea
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Plant"
          onClick={handleChange}
        >Plant
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Mountain"
          onClick={handleChange}
        >Mountain
          <FavoriteIcon />
         
        </Fab></td></tr>
        <tr><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Building"
          onClick={handleChange}
        >Building
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Person"
          onClick={handleChange}
        >Person
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Nature"
          onClick={handleChange}
        >Nature
          <FavoriteIcon />
         
        </Fab></td><td>
        <Fab
          color="secondary"
          aria-label="like"
          style={{
            height: "60px",
            width: "120px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          value="Meal"
          onClick={handleChange}
        >Meal
          <FavoriteIcon />
         
        </Fab></td></tr>
        </table>
        
       

      
      <Button
        variant="contained"
        color="success"
        endIcon={<SendIcon />}
        style={{ marginLeft: "650px", marginTop: "50px" }}
        onClick={handleSubmit}
        
      
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

export default Interests;

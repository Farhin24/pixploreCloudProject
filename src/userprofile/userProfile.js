import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "react-avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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

export default function UserProfile() {
  

  const { route } = useAuthenticator(context => [context.route]);
  
  return route === 'authenticated' ? <NewUserProfile />: <Login />;  
}

function NewUserProfile() {
  

  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  var [links,setLinks] = useState([]);  
  let navigate = useNavigate();
  useEffect(()=>{
    console.log(user.username);
    axios.post('https://grzhgfcds4zdkywxrx6lnwkzyu0lvego.lambda-url.us-east-1.on.aws/',{
      user_id: user.username
     }).then(function (response) {
      console.log(response.data.toString());
      axios.post('https://fmzdy563bcs2aw5jo6shmau3ty0coqao.lambda-url.us-east-1.on.aws/',{interests:response.data.toString() }) 
    .then(function (response1) {
      console.log(response1.data.toString().split(","))
      setLinks(response1.data.toString().split(","));
   })
   .catch(function (error) {
     console.log(error);
   })
      
   })
   .catch(function (error) {
     console.log(error);
   })

    
  },[]);
  return (
    <>
      <Box component="section" py={{ xs: 8, sm: 12 }}>
        <Container>
          <Box
            sx={{
              boxShadow: 3,
              maxWidth: "80%",
              maxHeight: "40%",
              margin: "-5% auto 5% auto",
              borderRadius: 4,
            }}
          >
            <Avatar
              githubHandle="aman-txt"
              size={150}
              round="90px"
              style={{ marginTop: "60px", marginLeft: "180px" }}
            />
            <Grid container justifyContent="center" py={6}>
              <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h3">Aman Patel</Typography>
                </Box>
               
                <Typography variant="body1" fontWeight="light" color="text">
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure. <br />
                </Typography>
              </Grid>
            </Grid>{" "}
            <Button variant="contained" onClick={()=> navigate("/user/interest")} style={{ margin: "-3% -12% 5% 20%" }}>
              Change Interests
            </Button>
            <Button variant="contained" onClick={()=> navigate("/user/saved")} style={{ margin: "-3% -12% 5% 20%" }}>
              Saved Posts
            </Button>
          </Box>
        </Container>




        <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          
          
          {links.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={()=> navigate("/view/post")}
              >
                <CardMedia
                  component="img"
                  image={card}
                  alt="random"
                />
                {/* <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>




      </Box>

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
  );
}

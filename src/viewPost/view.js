import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from "@mui/material/Box";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Login } from "../components/Login";
import Link from "@mui/material/Link";

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
  return (
    <>
      <Card sx={{ maxWidth: 800, margin: "2% auto 5% auto", float: "none", marginBottom: "10px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            width="400"
            image="https://source.unsplash.com/random"
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
          <Button size="small" color="primary">
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
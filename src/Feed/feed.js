import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/user/feed">
       PixPlore : Explore your Intrests
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <div className='addIcon' style={{
          position: "fixed",
          bottom:"5%",
          right:"5%"}}>
            
        <Fab color="primary" aria-label="add"  href="/user/createpost">
          <AddIcon />
        </Fab>
      </div>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            F E E D
          </Typography>
          {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography> */}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 1 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={()=> navigate("/view/post")}
              >
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the
                    content.
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
      {/* Footer */ }
  <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
  {/* End footer */ }
    </ThemeProvider >
  );
}
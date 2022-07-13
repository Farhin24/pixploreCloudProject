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
  const {user, signOut} = useAuthenticator((context) => [context.user]);  
  
  return route === 'authenticated' ? <NewUserProfile />: <Login />;  
}

function NewUserProfile() {
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
              githubHandle="sitebase"
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
                  <Typography variant="h3">Jon Whitton</Typography>
                </Box>
                <Grid container spacing={3} mb={3}>
                  <Grid item>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight="bold"
                    >
                      323&nbsp;
                    </Typography>
                    <Typography component="span" variant="body2" color="text">
                      Posts
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" fontWeight="light" color="text">
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure. <br />
                </Typography>
              </Grid>
            </Grid>{" "}
            <Button variant="contained" style={{ margin: "-3% -12% 5% 20%" }}>
              Change Interests
            </Button>
            <Button variant="contained" style={{ margin: "-3% 10% 5% 20%" }}>
              Edit Profile
            </Button>
            <Button
              variant="contained"
              style={{ margin: "-11% 10% 5% 70%" }}
              startIcon={<DeleteIcon />}
            >
              Delete Profile
            </Button>
          </Box>
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

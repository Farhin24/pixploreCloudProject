import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./navbar/nav.tsx";
import { Outlet } from "react-router-dom";

import SignIn from "./up/SignIn.js";
import SignUp from "./up/SignUp.js";
import CreatePost from "./Posts/createPost";
import Feed from "./Feed/feed.js";
import UserProfile from "./userprofile/userProfile";

const SidebarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/user/feed" element={<Feed />} />
            <Route path="/user/createpost" element={<CreatePost />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

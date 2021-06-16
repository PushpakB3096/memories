import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import memoriesLogo from "../../images/logo.png";
import useStyles from "./styles";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // resets the user (and logs them out, if token is expired) once the location, i.e. the current path in the app, changes from root to auth or vice-versa
  useEffect(() => {
    const token = user?.token;
    /*
     * decode() function takes the token and destructures the data.
     * decodedToken.exp will have the time of expiry of the token in ms.
     */
    if (token) {
      const decodedToken = token && decode(token);
      const expTimeInSecs = decodedToken?.exp * 1000;
      const currTimeInSecs = new Date().getTime();

      // if token has expired, log out the user
      if (expTimeInSecs < currTimeInSecs) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // function to logout the user
  const logout = () => {
    dispatch({
      type: LOGOUT
    });

    // clears the current user
    setUser(null);

    // redirect user to home page upon logging out
    history.push("/");
  };

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesLogo} alt='text' height='68px' />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {/* show the first letter of the name as profile picture */}
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='subtitle2'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

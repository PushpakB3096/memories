import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
// google svg icon
import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes";
import { signup, signin } from "../../actions/auth";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // state to handle whether to show password or not
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  // function that will submit the form
  const handleSubmit = e => {
    // prevents submission of the form by the browser
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  // function that will handle input
  const handleChange = e => {
    // set the formData equal to the values it already has then change one particular field based on the name
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // this function toggle between hiding and showing the password
  const handleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);

  // this function will switch between login or registration modes
  const switchMode = () => {
    setIsSignup(prevIsSignUp => !prevIsSignUp);
    // on switching between modes, hide the password field again
    setShowPassword(false);
  };

  // function to handle when user has successfully logged in using google auth
  const googleSuccess = async res => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: AUTH,
        data: {
          result,
          token
        }
      });
      // after action is dispatched, redirect user back to home page
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  // function to handle when user failed to log in using google auth
  const googleFailure = error => {
    console.error(
      "Logging in using Google was unsuccessful. Please try again.",
      error
    );
  };

  return (
    <Container component='main' maxWidth='xs'>
      {/* this displays a white background with a bit of elevation */}
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>
          {isSignup ? "Register" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* the below block will show fields related to new user registration */}
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {/* Below inputs are for both new and existing users */}
            <Input
              name='email'
              label='Email Address'
              type='email'
              handleChange={handleChange}
            />
            <Input
              name='password'
              label='Password'
              // only show the password if user wants to
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {/* below block only applicable in case of new user registration */}
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                type='password'
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? "Register" : "Sign in"}
          </Button>
          {/* button for google login */}
          <GoogleLogin
            // TODO: use env variables to store the client ID
            clientId='4902121967-vqeucl2nat3a3dk36emnsj16a3stlf4p.apps.googleusercontent.com'
            render={renderProps => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            // means that cookies can be shared among same origin resources.
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in!"
                  : "Don't have an account? Register now!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

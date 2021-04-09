import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";
import Input from "./Input";

const Auth = () => {
  const classes = useStyles();
  // state to handle whether to show password or not
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  // function that will submit the form
  const handleSubmit = () => {};

  // function that will handle input
  const handleChange = () => {};

  // this function toggle between hiding and showing the password
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // this function will switch between login or registration modes
  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    // on switching between modes, hide the password field again
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* this displays a white background with a bit of elevation */}
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Register" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* the below block will show fields related to user registration */}
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  half
                />
              </>
            )}
            {/* Below inputs are for both new and existing users */}
            <Input
              name="email"
              label="Email Address"
              type="email"
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              // only show the password if user wants to
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              onChange={handleChange}
            />
            {/* below block only applicable in case of new user registration */}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                onChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Register" : "Sign in"}
          </Button>
          <Grid container justify="flex-end">
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

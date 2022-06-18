import React, { Component } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, Alert, Link } from '@mui/material';
import axios from 'axios'


export default class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",

      emailError: false,
      passwordError: false,
      apiError: null,
    };
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const [email, password] = [data.get("email"), data.get("password")];
      let error = false;
      if (
        !email ||
        !(
          email &&
          email
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        )
      ) {
        this.setState({ emailError: true });
        error = true;
      }
      if (!password || !(password && password.trim())) {
        this.setState({ passwordError: true });
        error = true;
      }

      if (!error) {
        const res = await axios.post("/signin", { email, password });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/new_moment"
        }
      }
    } catch (error) {
      const errorType = error.response.data.error;
      this.setState({ apiError: errorType ? errorType : "error" });
    }
  };

  render() {
    const {  emailError, passwordError, apiError } = this.state;

    return (
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {apiError && (
            <>
              <br />
              <Alert severity='error'>{apiError === "user_not_found" ? "User not found" : apiError === 'wrong_password'? 'Wrong password' : "Error siging up"}</Alert>
            </>
          )}
          <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  error={emailError}
                  helperText={emailError ? "Please enter valid email" : ""}
                  onChange={() => this.setState({ emailError: false, apiError: false })}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  error={passwordError}
                  helperText={passwordError ? "Please enter password" : ""}
                  onChange={() => this.setState({ passwordError: false, apiError: false })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

                <Link onClick={() => this.props.history.push("/signup")} variant='body2'>
                  Don't have an account? Sign up
                </Link>
          </Box>
        </Box>
      </Container>
    )
  }
}

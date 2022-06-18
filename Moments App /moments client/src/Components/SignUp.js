import React, { Component } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Alert } from "@mui/material";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      city: "",

      nameError: false,
      emailError: false,
      cityError: false,
      passwordError: false,
      apiError: null,
    };
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const [name, email, password, city] = [data.get("name"), data.get("email"), data.get("password"), data.get("city")];
      let error = false;
      if (!name || !(name && name.trim())) {
        this.setState({ nameError: true });
        error = true;
      }
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
      if (!city || !(city && city.trim())) {
        this.setState({ cityError: true });
        error = true;
      }
      if (!password || !(password && password.trim())) {
        this.setState({ passwordError: true });
        error = true;
      }

      if (!error) {
        const res = await axios.post("/signup", { name, email, city, password });
          localStorage.setItem("token", res.data.token);
          this.props.history.push('/signin')
      }
    } catch (error) {
      const errorType = error.response.data.error;
      this.setState({ apiError: errorType ? errorType : "error" });
    }
  };
  render() {
    const { nameError, emailError, passwordError, cityError, apiError } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          {apiError && (
            <>
              <br />
              <Alert severity='error'>{apiError === "user_exists" ? "User already exists" : "Error siging up"}</Alert>
            </>
          )}
          <Box component='form' noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  autoFocus
                  error={nameError}
                  helperText={nameError ? "Please enter name" : ""}
                  onChange={() => this.setState({ nameError: false, apiError: false })}
                />
              </Grid>
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
                  id='city'
                  label='City'
                  name='city'
                  autoComplete='city'
                  error={cityError}
                  helperText={cityError ? "Please enter password" : ""}
                  onChange={() => this.setState({ cityError: false, apiError: false })}
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
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link onClick={() => this.props.history.push("/signin")} variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* <Snackbar
          open={this.state.openSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={() => this.setState({ openSnackbar: false })}
          message='Note archived'
        >
          <Alert severity='success' sx={{ width: "100%" }}>
            Signed up successfully!
          </Alert>
        </Snackbar> */}
      </Container>
    );
  }
}

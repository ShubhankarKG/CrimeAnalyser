import React from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function Login(props) {

  const [form, updateForm] = React.useState({
    email: "",
    password: "",
  });

  const [errors, updateErrors] = React.useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { handleUserToken } = props;

  function isFormValid() {
    let formIsValid = true;
    if (!form.email) {
      formIsValid = false;
      updateErrors(prevErrors => ({
        ...prevErrors,
        email: "*Email can't be Empty"
      }));
    }

    if (!form.password) {
      formIsValid = false;
      updateErrors(prevErrors => ({
        ...prevErrors,
        password: "*Please enter your password."
      }));
    }

    return formIsValid;

  }


  function handleChange(event) {
    const { name, value } = event.target;
    updateForm(prevDetails => {
      return (
        {
          ...prevDetails,
          [name]: value
        }
      );
    });
  }

  function handleClick(_) {
    if (isFormValid()) {
      axios.post("http://localhost:8000/login",
        form
      ).then(res => {
        const jwtToken = res.data.jwtToken;
        handleUserToken(jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        history.push("/");
      }).catch(err => {
        console.log(err.toString());
      })
    }
    else {
      alert("There are errors in your form !");
    }
  }

  return (
    <Container maxWidth="sm">
      <header>
        <div className="heading">
          <Typography variant="h5">
            ADMIN LOGIN
					</Typography>
        </div>
      </header>
      <br></br>
      <Paper style={{ padding: 16 }} id="from_style">
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
            <div className="errorMsg">{errors.email}</div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <div className="errorMsg">{errors.password}</div>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>

  )
}
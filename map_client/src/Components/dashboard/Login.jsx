import {
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Login({ setisLoggedIn, setCounter }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, toggleIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      setisLoggedIn(true);
      setCounter(0);
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={12} lg={12}> */}
          <Grid item xs={12}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => toggleIsPasswordVisible(!isPasswordVisible)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {!isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>{" "}
        </Grid>
      </Paper>
      {/* </Grid> */}
    </Container>
  );
}

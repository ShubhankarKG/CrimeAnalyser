import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import FIRForm from "./Components/FIRForm";
import {
  AppBar,
  Divider,
  IconButton,
  ListItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
  List,
  makeStyles,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";

const useStyles = makeStyles({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
});


function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [jwtToken, handleUserToken] = useState("");
  const isLoggedIn = jwtToken || localStorage.getItem("jwtToken");

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              color="inherit"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Data Acquisition Model
            </Typography>
            <section className={classes.rightToolbar}>
              {
                isLoggedIn ? <Link to="/"><Button variant="contained" onClick={() => {
                  handleUserToken("");
                  localStorage.clear();
                }}>LOGOUT</Button></Link> : <Link to="/login"><Button variant="contained">LOGIN</Button></Link>
              }
            </section>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => {
            if (!open) setOpen(true);
          }}
        >
          <List>
            <Divider />
            <Link to="/form"><ListItem>Fill Form</ListItem></Link>
            <Divider />
            <Link to="/fir-form"><ListItem>Fill FIR Form</ListItem></Link>
            <Divider />
            {
              isLoggedIn && <Link to="/dashboard"><ListItem>Dashboard</ListItem></Link>
            }

          </List>
        </SwipeableDrawer>
        <Switch>
          <Route path="/form"><Form /></Route>
          <Route path="/fir-form"><FIRForm /></Route>
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/login"><Login handleUserToken={handleUserToken} /></Route>
          <Route path="/"><Form /></Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

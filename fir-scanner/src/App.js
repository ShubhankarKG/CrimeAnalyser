import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import FIRForm from "./FIRForm";
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
import Dashboard from "./Components/Dashboard/Dashboard";

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
  const [form, setForm] = useState(0);
  return (
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
            Data Acquisition Model -{form === 0 && " Fill Form"}
            {form === 1 && " Fill FIR Form"}
          </Typography>
          <section className={classes.rightToolbar}>
            <Button variant="contained">LOGIN</Button>
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
          <ListItem onClick={() => setForm(0)}>Fill Form</ListItem>
          <Divider />
          <ListItem onClick={() => setForm(1)}>Fill FIR Form</ListItem>
          <Divider />
          <ListItem onClick={() => setForm(2)}>Dashboard</ListItem>
        </List>
      </SwipeableDrawer>
      {form === 0 && <Form />}
      {form === 1 && <FIRForm />}
      {form === 2 && <Dashboard />}
    </div>
  );
}

export default App;

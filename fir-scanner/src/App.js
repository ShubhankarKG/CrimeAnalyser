import React, { useState } from "react";
import logo from "./logo.svg";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(0);
  return (
    <div className="App">
      <AppBar
        position="static"
        style={{ backgroundColor: "#88C0D0", color: "#2E3440" }}
      >
        <Toolbar variant="dense">
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {form === 0 && "Fill Form"}
            {form === 1 && "Fill FIR Form"}
          </Typography>
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
        </List>
      </SwipeableDrawer>
      {form === 0 && <Form />}
      {form === 1 && <FIRForm />}
    </div>
  );
}

export default App;

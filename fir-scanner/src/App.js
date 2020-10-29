import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
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
          <Typography variant="h6">Fill Form</Typography>
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
          <ListItem>Fill Form</ListItem>
          <Divider />
          <ListItem>OCR Scan</ListItem>
          <Divider />
        </List>
      </SwipeableDrawer>
      <Form />
    </div>
  );
}

export default App;

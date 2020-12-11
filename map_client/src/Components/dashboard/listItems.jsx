import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { AccountBox } from "@material-ui/icons";

export const mainListItems = ({ setCounter, isLoggedIn }) => (
  <div>
    <ListItem button onClick={() => setCounter(0)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => setCounter(1)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItem>
    <ListItem button onClick={() => setCounter(2)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button onClick={() => setCounter(3)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Custom Reports" />
    </ListItem>
    {
      // Counter === 4 is for login
    }
    {isLoggedIn && (
      <ListItem button onClick={() => setCounter(5)}>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Mission Control" />
      </ListItem>
    )}
  </div>
);

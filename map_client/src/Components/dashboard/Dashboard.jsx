import * as React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import Chart from "./Chart";
import Orders from "./Orders";
import CustomOrder from "./CustomOrder";
import CustomChart from "./CustomChart";
import Map from "./Map";
import { messaging } from "../../init-fcm";
import Customer from "./Customer";
import { Button } from "@material-ui/core";
import Login from "./Login";
import MissionControl from "./MissionControl";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
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
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [counter, setCounter] = React.useState(0);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [tableData, setTableData] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("token = ", token);

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        };

        fetch("http://localhost:8000/token", requestOptions)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.navigator.serviceWorker.addEventListener("message", (message) => {
        console.log(
          message["data"]["firebase-messaging-msg-data"]["data"]["title"]
        );
        setNotification(true);
        const { body, title } = message["data"]["firebase-messaging-msg-data"][
          "data"
        ];
        setMessage(`${title} ${body}`);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:8000/gdb/location")
      .then((res) => res.json())
      .then((res) => {
        setTableData(res.result);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [counter]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {counter === 0 && "Dashboard"}
            {counter === 1 && "Map"}
            {counter === 2 && "Customers"}
            {counter === 3 && "Custom Reports"}
            {counter === 4 && "Login Page"}
            {counter === 5 && "Mission Control"}
          </Typography>
          <Button color="inherit" onClick={() => setCounter(4)}>
            LOGIN
          </Button>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems({ isLoggedIn, setCounter })}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {counter === 0 && (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders tableData={tableData} location={"Cities"} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
        {counter === 1 && <Map />}
        {counter === 2 && (
          <Customer
            notification={notification}
            setNotification={setNotification}
            message={message}
          />
        )}
        {counter === 3 && <CustomOrder />}
        {counter === 4 && (
          <Login setCounter={setCounter} setisLoggedIn={setIsLoggedIn} />
        )}
        {counter === 5 && <MissionControl />}
      </main>
    </div>
  );
}

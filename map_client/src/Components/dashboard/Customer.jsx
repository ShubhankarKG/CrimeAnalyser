import {
  Container,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import Title from "./Title";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

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

export default function Customer({ notification, setNotification, message, latitude, longitude }) {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(2007);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [locations, setLocations] = useState([]);


  useEffect(() => {
    if (!!latitude && !!longitude) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
      };

      fetch("http://localhost:8000/notif", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTableData(res.data);
          setIsSubmitted(true);
        })
        .catch((err) => console.log(err));
    }
  }, [latitude, longitude]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Grid item xs={12}>
              <Title>Your Current Location</Title>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Longitude</InputLabel>
              <TextField
                value={longitude}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Latitude</InputLabel>
              <TextField
                value={latitude}
                disabled
              />
            </Grid>
          </Paper>
        </Grid>
        {isSubmitted && (
          <>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Vulnerable Locations</Title>
                <Orders tableData={tableData} />
              </Paper>
            </Grid>
          </>
        )}
        {notification && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={notification}
            autoHideDuration={6000}
            onClose={() => setNotification(false)}
          >
            <Alert onClose={() => setNotification(false)} severity="error">
              {message}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
}

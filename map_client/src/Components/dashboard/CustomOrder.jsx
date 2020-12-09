import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from "react";
import CustomChart from "./CustomChart";
import Orders from "./Orders";
import Title from "./Title";
import clsx from "clsx";

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

export default function CustomOrder() {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(2007);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [locations, setLocations] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/locations?size=1615")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let locs = res['_embedded'].locations.map(item => item.location);
        console.log(locs);
        setLocations(locs);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, year: parseInt(year) }),
    };

    fetch("http://localhost:8000/gdb/custom", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTableData([res]);
        setIsSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Grid item xs={12}>
              <Autocomplete
                options={locations}
                value={location}
                onChange={(e, inp) => setLocation(inp)}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    label="Enter Location of choice"
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="year"
                value={year}
                fullWidth
                onChange={(e) => setYear(e.target.value)}
                label="Enter year of choice"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders tableData={tableData} location={location} />
          </Paper>
        </Grid>
        {isSubmitted && (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <CustomChart location={location} year={year} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

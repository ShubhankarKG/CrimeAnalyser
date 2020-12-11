import React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
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

export default function MissionControl() {
  const [crime, setCrime] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [knowData, setKnowData] = useState([]);
  const [counter, setCounter] = useState(0);

  React.useEffect(() => {
    fetch("http://localhost:8080/queries/people/getCriminals")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (isSubmitted) {
          if (crime === "All") {
            setTableData(res.criminals);
          } else {
            setTableData(res.criminals.filter((a) => a.crime === crime));
          }
        } else {
          setTableData(res.criminals);
          setIsSubmitted(true);
        }
      });
  }, [crime, isSubmitted]);

  React.useEffect(() => {
    if (!!name) {
      fetch(
        `http://localhost:8080/queries/people/getPeopleWhoKnowCriminal?name=${name}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setKnowData(res.people);
        });
    }
  }, [name]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {counter === 0 && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={["Theft", "Burglary", "Murder", "All"]}
                    value={crime}
                    onChange={(e, inp) => setCrime(inp)}
                    renderInput={(params) => (
                      <TextField {...params} label="Enter Crime Type" />
                    )}
                  />
                </Grid>
              </Paper>
            </Grid>
            {isSubmitted && (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Title>Criminal List</Title>
                  <Orders
                    tableData={tableData}
                    isMissionControl={true}
                    setName={setName}
                    setCounter={setCounter}
                  />
                </Paper>
              </Grid>
            )}
          </>
        )}
        {counter === 1 && (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Title>{`People Whom ${name} know`}</Title>
              <Orders tableData={knowData} />
              <Button onClick={() => setCounter(0)} color="primary">Go Back</Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

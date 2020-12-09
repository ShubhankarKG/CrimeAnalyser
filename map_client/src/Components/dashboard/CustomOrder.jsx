import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Orders from "./Orders";
import Title from "./Title";

export default function CustomOrder({ setTableData }) {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(2007);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>Set Query Parameters</Title>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Enter Location of choice"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Enter year of choice"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

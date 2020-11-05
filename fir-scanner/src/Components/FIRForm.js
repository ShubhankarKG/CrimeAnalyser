import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Typography,
  Container,
  Grid,
  TextField,
  Paper,
  Button,
} from "@material-ui/core";

const FIRForm = () => {
  const [form, updateForm] = useState({
    name: "",
    fathersName: "",
    address: "",
    contact: "",
    email: "",

    placeOfOccurence: "",

    offenceNature: "",
    offenceSection: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  return (
    <Container>
      <Paper
        style={{
          padding: "0.75em",
          marginTop: "1.25em",
          backgroundColor: "#D8DEE9",
          color: "#2E3440",
        }}
      >
        <Grid justify="flex-start" item xs={12} style={{ margin: "1em 0" }}>
          <label>Personal Details of the Complainant/Informant</label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            name="name"
            type="text"
            label="Name"
            onChange={handleChange}
            value={form.Name}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{ margin: "1em 0" }}>
          <TextField
            fullWidth
            required
            name="fathersName"
            type="text"
            label="Father's / Husband's Name"
            onChange={handleChange}
            value={form.fathersName}
            variant="outlined"
          />
        </Grid>

        <Grid item sm={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            onChange={handleChange}
            type="text"
            label="Phone No."
            name="contact"
            value={form.contact}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            onChange={handleChange}
            type="email"
            label="Email"
            name="email"
            value={form.email}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            fullWidth
            onChange={handleChange}
            type="text"
            label="Address"
            name="address"
            value={form.address}
            variant="outlined"
          />
        </Grid>

        <Grid justify="flex-start" item xs={12} style={{ margin: "1em 0" }}>
          <label>Place of Occurence</label>
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            fullWidth
            onChange={handleChange}
            type="text"
            label="Place"
            name="placeOfOccurence"
            value={form.placeOfOccurence}
            variant="outlined"
          />
        </Grid>

        <Grid justify="flex-start" item xs={12} style={{ margin: "1em 0" }}>
          <label>Offence</label>
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            fullWidth
            onChange={handleChange}
            type="text"
            label="Nature of Offence"
            name="offenceNature"
            value={form.offenceNature}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            fullWidth
            onChange={handleChange}
            type="text"
            label="Section"
            name="offenceSection"
            value={form.offenceSection}
            variant="outlined"
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default FIRForm;

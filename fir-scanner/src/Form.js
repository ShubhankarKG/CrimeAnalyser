import React, { useEffect } from "react";
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

function Form() {
  const [form, updateForm] = React.useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "Male",
    address: "",
    email: "",
    gate: "Main Gate",
    facultyID: "",
    description: "",
    facultyEmail: "",
    facultyUserName: "",
    age: "",
  });

  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "",
    address: "",
    email: "",
    gate: "",
    description: "",
    facultyUserName: "",
    age: "",
  });

  const [step, setStep] = React.useState(1);
  const [otp, setOtp] = React.useState(null);

  const otpFieldRef = React.useRef(null);
  const [status, setStatus] = React.useState("Validating visitor...");
  const [error, setError] = React.useState(false);
  const [faculty, setFaculty] = React.useState([]);

  // function getData() {
  //   axios.get(constants.FACULTY)
  //     .then((response) => {
  //       setFaculty(response.data);
  //     })
  //     .catch((e) => {
  //       alert(e.toString());
  //     })
  // }

  function isFormValid() {
    let formIsValid = true;
    if (!form.firstName) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "*First Name can't be empty",
      }));
    }

    if (!form.lastName) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "*Last Name can't be empty",
      }));
    }

    if (!form.address) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "*Address can't be empty",
      }));
    }

    if (!form.contact) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "*Contact Number can't be empty",
      }));
    }

    if (!form.description) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "*Reason for meeting can't be empty",
      }));
    }

    if (!form.email) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "*Email can't be empty",
      }));
    }

    if (!form.facultyUserName) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        facultyUserName: "*Faculty to meet can't be empty",
      }));
    }

    if (!form.gender) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        gender: "*Gender can't be empty",
      }));
    }

    if (!form.gate) {
      formIsValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        gate: "*Name of gate entered can't be empty",
      }));
    }

    return formIsValid;
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  // function handleClick(event) {
  //   if (isFormValid()) {
  //     event.preventDefault();
  //     fetch(`${constants.VISITOR}/create`, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setOtp(result.otp);
  //         setStep(2);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   else {
  //     alert("There are errors in your form !");
  //   }
  // }

  function handleChange(event) {
    const { name, value } = event.target;
    updateForm((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  }

  // function validateOTP(event) {
  //   if (otpFieldRef.current && parseInt(otpFieldRef.current.value) !== otp) {
  //     otpFieldRef.current.value = "";
  //     setError(true);
  //     otpFieldRef.current.placeholder = "Please try again.";
  //   }
  //   if (otpFieldRef.current && parseInt(otpFieldRef.current.value) === otp) {
  //     setError(false);
  //     fetch(`${constants.VISITOR}/validate`, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(result => {
  //         setStatus(result.info);
  //       });
  //   }
  // }

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
          <label> Name : </label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            name="firstName"
            type="text"
            label="First Name"
            onChange={handleChange}
            value={form.firstName}
            variant="outlined"
          />
          {errors.firstName ? (
            <div className="errorMsg">{errors.firstName}</div>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={6} style={{ margin: "1em 0" }}>
          <TextField
            fullWidth
            required
            name="lastName"
            type="text"
            label="Last Name"
            onChange={handleChange}
            value={form.lastName}
            variant="outlined"
          />
          {errors.lastName ? (
            <div className="errorMsg">{errors.lastName}</div>
          ) : null}
        </Grid>

        <Grid justify="flex-start" item xs={12} style={{ margin: "1em 0" }}>
          <label> Gender: </label>
          <Select
            defaultValue="Male"
            onChange={(event) => {
              updateForm((form) => ({
                ...form,
                gender: event.target.value,
              }));
            }}
            variant="outlined"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          {/* <div className="errorMsg">{errors.gender}</div> */}
          {errors.gender ? (
            <div className="errorMsg">{errors.gender}</div>
          ) : null}
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            onChange={handleChange}
            type="text"
            label="Age"
            name="age"
            value={form.age}
            variant="outlined"
          />
          {/* <div className="errorMsg">{errors.contact}</div> */}
          {errors.age ? <div className="errorMsg">{errors.age}</div> : null}
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            onChange={handleChange}
            type="text"
            label="Phone No."
            name="contact"
            value={form.contact}
            variant="outlined"
          />
          {/* <div className="errorMsg">{errors.contact}</div> */}
          {errors.contact ? (
            <div className="errorMsg">{errors.contact}</div>
          ) : null}
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            fullWidth
            onChange={handleChange}
            type="email"
            label="Email"
            name="email"
            value={form.email}
            variant="outlined"
          />
          {/* <div className="errorMsg">{errors.email}</div> */}
          {errors.email ? <div className="errorMsg">{errors.email}</div> : null}
        </Grid>

        <Grid item xs={12} style={{ margin: "1em 0" }}>
          <TextField
            required
            fullWidth
            onChange={handleChange}
            type="text"
            label="Enter Address"
            name="address"
            value={form.address}
            variant="outlined"
          />
          {/* <div className="errorMsg">{errors.address}</div> */}
          {errors.address ? (
            <div className="errorMsg">{errors.address}</div>
          ) : null}
        </Grid>
      </Paper>
    </Container>
  );
}
export default Form;

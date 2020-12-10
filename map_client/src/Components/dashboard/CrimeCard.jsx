import { Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import CustomChart from "./CustomChart"

const springHost = "http://localhost:8080";

const CrimeCard = ({location}) => {
  const [crimes, setCrimes] = useState(null);
  const [crimeInYear, setCrimeInYear] = useState(null);

  const getTotal = () => {
    return crimeInYear.rape + crimeInYear.murder + crimeInYear.hurt + crimeInYear.attemptToMurder;
  }
  const getStatus = () => {
    const dangerous =  getTotal()
    if(dangerous > 3000) return "Very High";
    else if(dangerous > 1000 && dangerous < 3000) return "High";
    else if(dangerous > 500 && dangerous < 1000) return "Moderate";
    else if(dangerous > 50 && dangerous < 500) return "Normal";
    else return "Low";
  }

  useEffect(() => {
    fetch(springHost + `/crimes/search/findByLocation?location=${location}`)
    .then(res => res.json())
    .then(res => {setCrimes([...res["_embedded"].crimes]); console.log(res["_embedded"].crimes)});
  }, []);

  return (
      <Grid container direction="column" spacing={2} style={{minWidth: 600, minHeight: 400}}>
        <Grid item>
          <Typography>
            {location}
          </Typography>
        </Grid>
        <Grid item>
          <Autocomplete 
            options={crimes}
            value={crimeInYear}
            onChange={(e, value) => setCrimeInYear(value)}
            getOptionLabel={option => option.year.toString()}
            renderInput={params => (
              <TextField
                {...params}
                label="Select Year"
                fullWidth={false}
                style={{minWidth: 200}}
              />
            )}
          />
        </Grid>
        {crimeInYear && (
        <Grid item>
          <Typography>
            This place had {getStatus()} Crime Rates in the year {crimeInYear.year}
          </Typography>
          <Typography variant="p">
            There have been {getTotal()} dangerous crimes (Murder, Atttempt to murder, Rape and Hurt).
          </Typography>
        </Grid>
        )}
        <Grid item>
          {crimeInYear && (
            <CustomChart location={crimeInYear.location} year={crimeInYear.year} />
          )}
        </Grid>
      </Grid>
  )
};

export default CrimeCard;

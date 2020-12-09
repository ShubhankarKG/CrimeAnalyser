import { Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import CustomChart from "./CustomChart"

const springHost = "http://localhost:8080";

const CrimeCard = ({location}) => {
  const [crimes, setCrimes] = useState(null);
  const [crimeInYear, setCrimeInYear] = useState(null);

  useEffect(() => {
    fetch(springHost + `/crimes/search/findByLocation?location=${location}`)
    .then(res => res.json())
    .then(res => {setCrimes([...res["_embedded"].crimes]); console.log(res["_embedded"].crimes)});
  }, []);

  return (
      <Grid container direction="column" spacing={2} style={{minWidth: 600, minHeight: 300}}>
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
        <Grid item>
          {crimeInYear && (
            <CustomChart location={crimeInYear.location} year={crimeInYear.year} />
          )}
        </Grid>
      </Grid>
  )
};

export default CrimeCard;

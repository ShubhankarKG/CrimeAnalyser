import React, { useState } from 'react'
import ReactMapGL, { HTMLOverlay, Layer, Marker, Popup, Source } from "react-map-gl";
import { LocationOn, ToggleOff, ToggleOn } from '@material-ui/icons/';
import CrimeCard from "./CrimeCard";
import { Backdrop, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, Paper } from '@material-ui/core';
import heatmapLayer from './heatmap-style';

const springHost = "http://localhost:8080";


export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 19.07599,
    longitude: 72.877393,
    zoom: 4,
    width: '100vw',
    height: '100vh'
  });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  React.useEffect(() => {
    const p1 = fetch(springHost + `/locations?size=250&page=0`)
      .then(res => res.json())
      .then(res => setLocations(s => [...s, ...res['_embedded'].locations]))
    const p2 = fetch(springHost + `/locations?size=250&page=1`)
      .then(res => res.json())
      .then(res => setLocations(s => [...s, ...res['_embedded'].locations]));
    const p3 = fetch(springHost + "/queries/locations/getLocationsWithCrimeInYear?year=2008&crime=Theft")
                .then(res => res.json())
                .then(res => setHeatmapData(res));
    Promise.all([p1, p2, p3]).then((res1, res2, res3) => setLoading(false));
  }, []);

  return (
    <>
    {loading && 
      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>}
    {!loading && (
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => {
          setViewport(nextViewport)
        }}
        //mapStyle="mapbox://styles/shubhankarkg/ckh4wo0z108pz19mpn2ay57dj"
      >
        <HTMLOverlay redraw={({
          width,
          height,
          isDragging,
          project,
          unproject,
        }) => (
          <>
            {!showOverlay && (
              <IconButton
               onClick={(e) => setShowOverlay(true)}
               style={{
                position:"absolute",
                top: 10,
                left: 10,
               }}
               >
                <ToggleOff color="secondary" fontSize="large" />
              </IconButton>
            )}
            {showOverlay && (
              <Paper style={{
                position:"absolute",
                top: 10,
                left: 10,
                width: 300,
                height: 150
              }}>
                <>
                  <IconButton
                    onClick={(e) => setShowOverlay(false)}
                    style={{
                      position:"absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <ToggleOn color="primary" fontSize="small" />
                  </IconButton>
                  <Grid container style={{marginLeft: 10, marginRight: 10}} direction="column" alignItems="flex-start">
                    <Grid item>
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={showMarkers}
                            onChange={(e, checked) => setShowMarkers(checked)}
                          />}
                        label="Show Markers"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel 
                          control={
                            <Checkbox
                              checked={showHeatmap}
                              onChange={(e, checked) => setShowHeatmap(checked)}
                            />}
                          label="Show Heatmap"
                      />
                    </Grid>
                  </Grid>
                </>
              </Paper>
            )}
          </>
        )}>
        </HTMLOverlay>
        {locations.length && showMarkers && locations.map((item, idx) => {
          if(item && item.coordinates) return (
            <Marker
              key={idx} 
              latitude={item.coordinates.latitude} 
              longitude={item.coordinates.longitude}
            >
              <LocationOn
                style={{cursor: "pointer", color: "#ce2029"}}
                onClick={(e) => {
                  setSelected(item);
                }} 
              />
            </Marker>
          )
        })}
        {showMarkers && selected && selected.coordinates && selected.location && (
          <Popup
            latitude={selected.coordinates.latitude}
            longitude={selected.coordinates.longitude}
            closeButton
            closeOnClick={false}
            onClose={() => setSelected(null)}
          >
            <CrimeCard location={selected.location} />
          </Popup>
        )}
        {showHeatmap && heatmapData && (
          <Source type="geojson" data={heatmapData}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </ReactMapGL>
      )}
    </>
  )
}

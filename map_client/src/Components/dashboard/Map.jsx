import React, { useState } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
// import * as cityData from "../SampleData/data.json"
import cities from "cities.json";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 19.07599,
    longitude: 72.877393,
    zoom: 4,
    width: '100vw',
    height: '100vh'
  })

  return (
    <ReactMapGL {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}
      mapStyle="mapbox://styles/shubhankarkg/ckh4wo0z108pz19mpn2ay57dj"
    >
      {
        console.log(cities.filter(city => city.country === "IN"))
      }{cities.filter(city => city.country === "IN").map((city) => (
        <Marker
          key={`${city.lat}_${city.lng}`}
          latitude={parseInt(city.lat)}
          longitude={parseInt(city.lng)}
        >
          {/* <p style={{fontWeight: "bold", color: "white"}}>Crime rate = 101</p> */}
        </Marker>
      ))
      }
    </ReactMapGL>
  )
}

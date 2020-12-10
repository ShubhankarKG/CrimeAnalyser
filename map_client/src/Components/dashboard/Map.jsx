import 'react-map-gl-directions/dist/mapbox-gl-directions.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useRef, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import AddLocationTwoToneIcon from "@material-ui/icons/AddLocationTwoTone";
import CrimeCard from "./CrimeCard";
import Directions from "react-map-gl-directions";

const springHost = "http://localhost:8080";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 19.07599,
    longitude: 72.877393,
    zoom: 4,
    width: "100vw",
    height: "100vh",
  });
  const [locations, setLocations] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef(null);

  React.useEffect(() => {
    fetch(springHost + `/locations?size=500&page=0`)
      .then((res) => res.json())
      .then((res) => {
        setLocations((s) => [...s, ...res["_embedded"].locations]);
        setLoading1(false);
      });
    fetch(springHost + `/locations?size=500&page=1`)
      .then((res) => res.json())
      .then((res) => {
        setLocations((s) => [...s, ...res["_embedded"].locations]);
        setLoading2(false);
      });
  }, []);

  return (
    <>
      {loading1 && loading2 && <h2>Loading...</h2>}
      {!loading1 && !loading2 && (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(nextViewport) => {
            setViewport(nextViewport);
          }}
          ref={mapRef}
          // mapStyle="mapbox://styles/shubhankarkg/ckii1wbtm1afk19mg8x6bbnf5"
        >
          {locations.length &&
            locations.map((item, idx) => {
              if (item && item.coordinates)
                return (
                  <Marker
                    key={idx}
                    latitude={item.coordinates.latitude}
                    longitude={item.coordinates.longitude}
                  >
                    <AddLocationTwoToneIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setSelected(item);
                      }}
                    />
                  </Marker>
                );
            })}
          {selected && selected.coordinates && selected.location && (
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
          <Directions
            mapRef={mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        </ReactMapGL>
      )}
    </>
  );
}

package com.crimeanalyser.graphapi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeoJSON {
  private final String type = "Feature";
  private Map<String, Object> geometry;
  private Map<String, Object> properties;
  public GeoJSON(double latitude, double longitude, Map<String, Object> properties) {
    geometry = new HashMap<>();
    geometry.put("type", "Point");
    List<Double> coords = new ArrayList<>();
    coords.add(latitude);
    coords.add(longitude);
    geometry.put("coordinates", coords);
    this.properties = properties;

  }
}

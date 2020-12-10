package com.crimeanalyser.graphapi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointObject {
  private double latitude;
  private double longitude;
  public PointObject(double latitude, double longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

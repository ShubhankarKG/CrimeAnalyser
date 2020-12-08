package com.crimeanalyser.graphapi.entities;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Location {
  
  @Id @GeneratedValue private Long id;
  private String location;

  public Location(String location) {
    this.location = location;
  }

  public Long getId() {
    return id;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}

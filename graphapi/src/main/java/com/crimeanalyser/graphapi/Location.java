package com.crimeanalyser.graphapi;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.types.spatial.GeographicPoint2d;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NodeEntity
public class Location {
  
  @Id @GeneratedValue private Long id;
  private String location;
  private GeographicPoint2d coordinates;
}

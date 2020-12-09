package com.crimeanalyser.graphapi;

import java.util.Set;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.types.spatial.GeographicPoint2d;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NodeEntity
public class Person {
  @Id @GeneratedValue private Long id;
  private String name;
  private String gender;
  private String location;
  private Integer age;
  private GeographicPoint2d coordinates;

  @Relationship(type = "KNOWS", direction = Relationship.UNDIRECTED)
  private Set<Person> friends;


}

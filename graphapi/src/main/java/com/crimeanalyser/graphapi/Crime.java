package com.crimeanalyser.graphapi;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NodeEntity
public class Crime {
  @Id @GeneratedValue private Long id;
  private Long year;

  @Property("Dowry")
  private Long dowry;

  @Property("Rape")
  private Long rape;

  @Property("Riots")
  private Long riots;

  @Property("Murder")
  private Long murder;

  @Property("Hurt")
  private Long hurt;

  @Property("Burglary")
  private Long burglary;

  @Property("Theft")
  private Long theft;

  @Property("KidnappingAndAbduction")
  private Long kidnappingAndAbduction;

  @Property("Cheating")
  private Long cheating;

  @Property("AttemptToMurder")
  private Long attemptToMurder;

  private String location;

}

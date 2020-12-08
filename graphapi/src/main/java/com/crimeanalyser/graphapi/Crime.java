package com.crimeanalyser.graphapi;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Crime {
  @Id @GeneratedValue private Long id;
  private Integer count;
  private String type;

  private Crime(){}
  public Crime(String type, Integer count) {
    this.type = type;
    this.count = count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Integer getCount() {
    return count;
  }

  public Long getId() {
    return id;
  }

  public String getType() {
    return type;
  }

}

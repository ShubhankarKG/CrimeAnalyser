package com.crimeanalyser.graphapi;

import java.util.Set;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class Person {
  @Id @GeneratedValue private Long id;
  private String name;
  private String gender;
  private String location;
  private Integer age;

  @Relationship(type = "KNOWS", direction = Relationship.UNDIRECTED)
  private Set<Person> friends;

  private Person() {}
  public Person(String name, String gender, String location, Integer age) {
    this.name = name;
    this.gender = gender;
    this.location = location;
    this.age = age;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public void setFriends(Set<Person> friends) {
    this.friends = friends;
  }

  public Long getId() {
    return id;
  }
  
  public Integer getAge() {
    return age;
  }

  public String getGender() {
    return gender;
  }

  public String getLocation() {
    return location;
  }

  public String getName() {
    return name;
  }

  public Set<Person> getFriends() {
    return friends;
  }

}

package com.crimeanalyser.graphapi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/queries/people")
public class PersonController {
  
  @Autowired
  private Driver driver;

  @GetMapping("/getCriminals")
  public Map<String, Object> getCriminals() {
    try(Session session = driver.session()) {
      Map<String, Object> result = new HashMap<>();
      List<Map<String, Object>> list = new ArrayList<>();
      
      session.readTransaction(tx -> {
        tx.run("MATCH (p:Person)-[l:COMMITED]->(c:Crime) RETURN p, l.type as crime, c.year as year;")
        .stream().forEach(record -> {
          Map<String, Object> map = new HashMap<>();

          map.put("name", record.get("p").get("name").asObject());
          map.put("gender", record.get("p").get("gender").asObject());
          map.put("age", record.get("p").get("age").asObject());
          map.put("locaion", record.get("p").get("location").asObject());
          map.put("crime", record.get("crime").asObject());
          map.put("year", record.get("year").asObject());

          list.add(map);
        });
        return list;
      });

      result.put("criminals", list);
      return result;
    }
  }

  @GetMapping("/getPeopleWhoKnowCriminal")
  public Map<String, Object> getPeopleWhoKnowCriminal(
    @RequestParam String name
  ) {
    try(Session session = driver.session()) {
      Map<String, Object> result = new HashMap<>();
      List<Map<String, Object>> list = new ArrayList<>();
      
      session.readTransaction(tx -> {
        tx.run("MATCH (p:Person)-[:KNOWS]->(c:Person) WHERE c.name = \"" + name + "\" RETURN p;")
        .stream().forEach(record -> {
          Map<String, Object> map = new HashMap<>();

          map.put("name", record.get("p").get("name").asObject());
          map.put("gender", record.get("p").get("gender").asObject());
          map.put("age", record.get("p").get("age").asObject());
          map.put("locaion", record.get("p").get("location").asObject());

          list.add(map);
        });
        return list;
      });

      result.put("people", list);
      return result;
    }
  }

}

package com.crimeanalyser.graphapi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController()
@RequestMapping("/queries/locations")
public class LocationController {
  
  @Autowired
  private Driver driver;

  private final String COORD = "coordinates";

  @GetMapping(value = "/getLocationsWithCrimeInYear", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Map<String, Object>> getLocationsWithCrimesInYear(
    @RequestParam Integer year,
    @RequestParam String crime
  ) {
    try(Session session = driver.session()) {
      List<Map<String, Object>> list = new ArrayList<>();
      session.readTransaction(tx -> {
        tx.run("MATCH (c:Crime)-[:OCCURED_IN]->(l:Location) WHERE c.year = " + year + " AND l.coordinates IS NOT NULL RETURN l, c;")
        .stream().forEach(record -> {
          Map<String, Object> map = new HashMap<>();

          PointObject obj = new PointObject(
            record.get("l").get(COORD).asPoint().x(),
            record.get("l").get(COORD).asPoint().y()
          );

          map.put(COORD, obj);
          map.put("location", record.get("l").get("location").asObject());
          map.put("crime", record.get("c").get(crime).asObject());
          map.put("type", crime);
          list.add(map);
        });
        return list;
      });
      return list;
    }
  }
}

package com.crimeanalyser.graphapi;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController()
@RequestMapping("/queries/crimes")
public class CrimeController {

  @Autowired
  Driver driver;

  @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE) 
  public List<String> getDefault() {
    List<String> res = new ArrayList<>();
    String host = "http://localhost:8080/queries/crimes";
    res.add(host + "/countCrimesByType");
    return res;
  }

  @GetMapping(path = "/countCrimesByType", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Map<String, Object>> countCrimesByType() {
    try(Session session = driver.session()) {
      List<Map<String, Object>> result = new ArrayList<>();
      session.readTransaction(tx -> {
        tx.run("MATCH (c:Crime) RETURN c.type as crimeType, count(c) as total ORDER BY c.type DESC")
          .stream().forEach(item -> {
            Map<String, Object> map = new HashMap<>();
            for(String key: item.keys())
              map.put(key, item.get(key).toString());
            result.add(map);
       });
       return result;
      });
      return result;
    }
  }
}

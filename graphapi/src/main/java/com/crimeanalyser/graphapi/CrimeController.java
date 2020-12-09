package com.crimeanalyser.graphapi;

import org.neo4j.driver.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
}

package com.crimeanalyser.graphapi;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface LocationRepository extends Neo4jRepository<Location, Long> {
  List<Location> findByLocation(@Param("location") String location);
}

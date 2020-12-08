package com.crimeanalyser.graphapi.repositories;

import java.util.List;

import com.crimeanalyser.graphapi.entities.Location;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends Neo4jRepository<Location, Long> {
  List<Location> findByLocation(@Param("location") String location);

}

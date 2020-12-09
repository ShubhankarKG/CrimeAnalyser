package com.crimeanalyser.graphapi;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CrimeRepository extends Neo4jRepository<Crime, Long> {
  List<Crime> findByYear(@Param("year") Long year);
  List<Crime> findByLocation(@Param("location") String location);
  List<Crime> findByYearAndLocation(@Param("year") Long year, @Param("location") String location);
}

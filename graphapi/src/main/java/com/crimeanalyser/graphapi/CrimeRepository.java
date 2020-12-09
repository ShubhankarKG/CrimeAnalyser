package com.crimeanalyser.graphapi;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CrimeRepository extends Neo4jRepository<Crime, Long> {
  List<Crime> findByType(@Param("type") String type);

  @Query("MATCH (c:Crime) RETURN c.type, COUNT(c) AS total ORDER BY c.type")
  List<CrimeCount> countCrimesByType();

  @Query("MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE l.location=$location RETURN c")
  List<Crime> getCrimesInLocation(@Param("location") String location);

  @Query("MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE r.year=$year RETURN c")
  List<Crime> getCrimesInYear(@Param("year") Integer year);

  @Query(value = "MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE r.year=$year AND l.location=$location RETURN c")
  List<Crime> getCrimesInLocationAndYear(@Param("year") Integer year, @Param("location") String location);
}

class CrimeCount {
  private String type;
  private Long total;

  public void setType(String crimeType) {
    this.type = type;
  }

  public void setTotal(Long total) {
    this.total = total;
  }

  public String getType() {
    return type;
  }

  public Long getTotal() {
    return total;
  }
}

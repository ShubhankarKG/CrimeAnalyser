package com.crimeanalyser.graphapi;

import java.util.List;
import java.util.Map;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CrimeRepository extends CrudRepository<Crime, Long> {
  List<Crime> findByType(@Param("type") String type);

  @Query("MATCH (c:Crime) RETURN c.type, count(c) as total ORDER BY crimeType DESC")
  Iterable<CrimeCount> countAllByType();

  @Query("MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE l.location=$location RETURN c")
  List<Crime> getCrimesInLocation(@Param("location") String location);

  @Query("MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE r.year=$year RETURN c")
  List<Crime> getCrimesInLocation(@Param("year") Integer year);

  @Query(value = "MATCH (c:Crime)-[r:OCCURED_IN]->(l:Location) WHERE r.year=$year AND l.location=$location RETURN c")
  List<Crime> getCrimesInLocationAndYear(@Param("year") Integer year, @Param("location") String location);
}

class CrimeCount {
  private String crimeType;
  private Long total;

  public CrimeCount(String crimeType, Long total) {
    this.total = total;
    this.crimeType = crimeType;
  }

  public void setCrimetype(String crimeType) {
    this.crimeType = crimeType;
  }

  public void setTotal(Long total) {
    this.total = total;
  }

  public String getCrimeType() {
    return crimeType;
  }

  public Long getTotal() {
    return total;
  }
}

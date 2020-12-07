package com.crimeanalyser.graphapi;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {
  List<Location> findByLocation(@Param("location") String location);
}

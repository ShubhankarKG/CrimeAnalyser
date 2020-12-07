package com.crimeanalyser.graphapi;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface CrimeRepository extends PagingAndSortingRepository<Crime, Long> {
  List<Crime> findByType(@Param("type") String type);
}

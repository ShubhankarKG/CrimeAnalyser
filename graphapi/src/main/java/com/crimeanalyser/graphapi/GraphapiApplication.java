package com.crimeanalyser.graphapi;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GraphapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GraphapiApplication.class, args);
	}

	@Bean
	public Driver getDriver() {
		return GraphDatabase.driver("bolt://localhost:7687", AuthTokens.basic("neo4j", "crimeanalyser"));
	}

}

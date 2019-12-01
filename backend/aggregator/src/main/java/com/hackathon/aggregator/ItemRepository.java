package com.hackathon.aggregator;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface ItemRepository extends JpaRepository<Item, Long>{
	
	@Query("SELECT i FROM Item i where i.price = :price")
	List<Item> findByPrice(@Param("price") String price);
	
	@Query("SELECT i FROM Item i where i.price > ?1 and i.price < ?2")
	List<Item> priceRange(@Param("min") String min, @Param("max") String max);
	
	@Query("SELECT i FROM Item i where i.minSize = :size OR i.maxSize = :size")
	List<Item> findBySize(@Param("size") String size);
	
	@Query("SELECT i FROM Item i where i.name LIKE %:name%")
	List<Item> findByName(@Param("name") String name);

}

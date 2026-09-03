package com.scentmatch.repository;

import com.scentmatch.entity.Perfume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PerfumeRepository

        extends JpaRepository<Perfume, Long> {


    List<Perfume>
    findByBrandIgnoreCase(
            String brand
    );


    List<Perfume>
    findByFragranceFamilyIgnoreCase(
            String fragranceFamily
    );


    List<Perfume>
    findByGenderIgnoreCase(
            String gender
    );

}
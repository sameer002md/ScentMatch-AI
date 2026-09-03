package com.scentmatch.service;

import com.scentmatch.entity.Perfume;
import com.scentmatch.repository.PerfumeRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PerfumeService {


    private final PerfumeRepository
            perfumeRepository;


    public PerfumeService(

            PerfumeRepository perfumeRepository

    ) {

        this.perfumeRepository =
                perfumeRepository;

    }


    // ==========================================
    // CREATE
    // ==========================================

    public Perfume createPerfume(

            Perfume perfume

    ) {


        return perfumeRepository

                .save(
                        perfume
                );

    }


    // ==========================================
    // GET ALL
    // ==========================================

    public List<Perfume>
    getAllPerfumes() {


        return perfumeRepository
                .findAll();

    }


    // ==========================================
    // GET BY ID
    // ==========================================

    public Optional<Perfume>
    getPerfumeById(

            Long id

    ) {


        return perfumeRepository
                .findById(
                        id
                );

    }


    // ==========================================
    // GET BY BRAND
    // ==========================================

    public List<Perfume>
    getByBrand(

            String brand

    ) {


        return perfumeRepository

                .findByBrandIgnoreCase(
                        brand
                );

    }


    // ==========================================
    // GET BY FRAGRANCE FAMILY
    // ==========================================

    public List<Perfume>
    getByFragranceFamily(

            String fragranceFamily

    ) {


        return perfumeRepository

                .findByFragranceFamilyIgnoreCase(
                        fragranceFamily
                );

    }


    // ==========================================
    // GET BY GENDER
    // ==========================================

    public List<Perfume>
    getByGender(

            String gender

    ) {


        return perfumeRepository

                .findByGenderIgnoreCase(
                        gender
                );

    }


    // ==========================================
    // UPDATE PERFUME
    // ==========================================

    public Perfume updatePerfume(

            Long id,

            Perfume perfumeDetails

    ) {


        Perfume perfume =

                perfumeRepository

                        .findById(
                                id
                        )

                        .orElseThrow(

                                () ->

                                        new RuntimeException(

                                                "Perfume not found with id: "
                                                        + id

                                        )

                        );


        perfume.setName(
                perfumeDetails.getName()
        );

        perfume.setBrand(
                perfumeDetails.getBrand()
        );

        perfume.setGender(
                perfumeDetails.getGender()
        );

        perfume.setFragranceFamily(
                perfumeDetails.getFragranceFamily()
        );

        perfume.setTopNotes(
                perfumeDetails.getTopNotes()
        );

        perfume.setMiddleNotes(
                perfumeDetails.getMiddleNotes()
        );

        perfume.setBaseNotes(
                perfumeDetails.getBaseNotes()
        );

        perfume.setOccasion(
                perfumeDetails.getOccasion()
        );

        perfume.setSeason(
                perfumeDetails.getSeason()
        );

        perfume.setLongevity(
                perfumeDetails.getLongevity()
        );

        perfume.setSillage(
                perfumeDetails.getSillage()
        );

        perfume.setPrice(
                perfumeDetails.getPrice()
        );

        perfume.setDescription(
                perfumeDetails.getDescription()
        );

        perfume.setImageUrl(
                perfumeDetails.getImageUrl()
        );


        return perfumeRepository

                .save(
                        perfume
                );

    }


    // ==========================================
    // DELETE PERFUME
    // ==========================================

    public void deletePerfume(

            Long id

    ) {


        if (

                !perfumeRepository.existsById(
                        id
                )

        ) {


            throw new RuntimeException(

                    "Perfume not found with id: "
                            + id

            );

        }


        perfumeRepository

                .deleteById(
                        id
                );

    }

}
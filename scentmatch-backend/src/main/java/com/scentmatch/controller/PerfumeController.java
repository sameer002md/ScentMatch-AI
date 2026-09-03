package com.scentmatch.controller;

import com.scentmatch.entity.Perfume;
import com.scentmatch.service.FileStorageService;
import com.scentmatch.service.PerfumeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/perfumes")
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class PerfumeController {

    private final PerfumeService perfumeService;

    private final FileStorageService
            fileStorageService;


    public PerfumeController(

            PerfumeService perfumeService,

            FileStorageService fileStorageService

    ) {

        this.perfumeService =
                perfumeService;

        this.fileStorageService =
                fileStorageService;

    }


    // ==========================================
    // CREATE PERFUME WITH IMAGE
    // ==========================================

    @PostMapping(
            consumes = "multipart/form-data"
    )
    public ResponseEntity<Perfume>
    createPerfume(

            @RequestParam("name")
            String name,

            @RequestParam("brand")
            String brand,

            @RequestParam(
                    value = "gender",
                    required = false
            )
            String gender,

            @RequestParam(
                    value = "fragranceFamily",
                    required = false
            )
            String fragranceFamily,

            @RequestParam(
                    value = "topNotes",
                    required = false
            )
            String topNotes,

            @RequestParam(
                    value = "middleNotes",
                    required = false
            )
            String middleNotes,

            @RequestParam(
                    value = "baseNotes",
                    required = false
            )
            String baseNotes,

            @RequestParam(
                    value = "occasion",
                    required = false
            )
            String occasion,

            @RequestParam(
                    value = "season",
                    required = false
            )
            String season,

            @RequestParam(
                    value = "longevity",
                    required = false
            )
            String longevity,

            @RequestParam(
                    value = "sillage",
                    required = false
            )
            String sillage,

            @RequestParam(
                    value = "price",
                    required = false
            )
            Double price,

            @RequestParam(
                    value = "description",
                    required = false
            )
            String description,

            @RequestParam(
                    value = "image",
                    required = false
            )
            MultipartFile image

    ) {


        Perfume perfume =
                new Perfume();


        perfume.setName(name);

        perfume.setBrand(brand);

        perfume.setGender(gender);

        perfume.setFragranceFamily(
                fragranceFamily
        );

        perfume.setTopNotes(
                topNotes
        );

        perfume.setMiddleNotes(
                middleNotes
        );

        perfume.setBaseNotes(
                baseNotes
        );

        perfume.setOccasion(
                occasion
        );

        perfume.setSeason(
                season
        );

        perfume.setLongevity(
                longevity
        );

        perfume.setSillage(
                sillage
        );

        perfume.setPrice(
                price
        );

        perfume.setDescription(
                description
        );


        // ======================================
        // SAVE IMAGE
        // ======================================

        if (

                image != null

                &&

                !image.isEmpty()

        ) {

            String imagePath =

                    fileStorageService
                            .saveImage(
                                    image
                            );


            perfume.setImageUrl(
                    imagePath
            );

        }


        Perfume savedPerfume =

                perfumeService
                        .createPerfume(
                                perfume
                        );


        return ResponseEntity

                .status(
                        HttpStatus.CREATED
                )

                .body(
                        savedPerfume
                );

    }


    // ==========================================
    // GET ALL
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Perfume>>
    getAllPerfumes() {

        return ResponseEntity.ok(

                perfumeService
                        .getAllPerfumes()

        );

    }


    // ==========================================
    // GET BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Perfume>
    getPerfumeById(

            @PathVariable Long id

    ) {

        Optional<Perfume> perfume =

                perfumeService
                        .getPerfumeById(
                                id
                        );


        return perfume

                .map(
                        ResponseEntity::ok
                )

                .orElseGet(

                        () ->

                                ResponseEntity
                                        .notFound()
                                        .build()

                );

    }


    // ==========================================
    // GET BY BRAND
    // ==========================================

    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Perfume>>
    getByBrand(

            @PathVariable String brand

    ) {

        return ResponseEntity.ok(

                perfumeService
                        .getByBrand(
                                brand
                        )

        );

    }


    // ==========================================
    // GET BY FAMILY
    // ==========================================

    @GetMapping("/family/{family}")
    public ResponseEntity<List<Perfume>>
    getByFragranceFamily(

            @PathVariable String family

    ) {

        return ResponseEntity.ok(

                perfumeService
                        .getByFragranceFamily(
                                family
                        )

        );

    }


    // ==========================================
    // GET BY GENDER
    // ==========================================

    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<Perfume>>
    getByGender(

            @PathVariable String gender

    ) {

        return ResponseEntity.ok(

                perfumeService
                        .getByGender(
                                gender
                        )

        );

    }


    // ==========================================
    // UPDATE
    // KEEP EXISTING JSON UPDATE FOR NOW
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Perfume>
    updatePerfume(

            @PathVariable Long id,

            @RequestBody Perfume perfume

    ) {

        Perfume updatedPerfume =

                perfumeService
                        .updatePerfume(
                                id,
                                perfume
                        );


        return ResponseEntity.ok(
                updatedPerfume
        );

    }


    // ==========================================
    // DELETE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deletePerfume(

            @PathVariable Long id

    ) {

        perfumeService
                .deletePerfume(id);


        return ResponseEntity
                .noContent()
                .build();

    }

}
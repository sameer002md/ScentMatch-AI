package com.scentmatch.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;


    public String saveImage(MultipartFile file) {

        try {

            Path uploadPath =
                    Paths.get(uploadDir)
                            .toAbsolutePath()
                            .normalize();


            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);

            }


            String originalFileName =
                    file.getOriginalFilename();


            String fileExtension = "";


            if (
                    originalFileName != null
                    &&
                    originalFileName.contains(".")
            ) {

                fileExtension =
                        originalFileName.substring(
                                originalFileName.lastIndexOf(".")
                        );

            }


            String fileName =
                    UUID.randomUUID()
                            .toString()
                            +
                            fileExtension;


            Path targetLocation =
                    uploadPath.resolve(
                            fileName
                    );


            Files.copy(

                    file.getInputStream(),

                    targetLocation,

                    StandardCopyOption.REPLACE_EXISTING

            );


            return "/uploads/" + fileName;


        } catch (IOException exception) {

            throw new RuntimeException(

                    "Could not upload image",

                    exception

            );

        }

    }

}
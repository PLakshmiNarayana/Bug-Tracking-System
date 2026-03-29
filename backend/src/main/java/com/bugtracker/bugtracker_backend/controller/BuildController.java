package com.bugtracker.bugtracker_backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.bugtracker.bugtracker_backend.model.Build;
import com.bugtracker.bugtracker_backend.service.BuildService;

@RestController
@RequestMapping("/api/builds")
@CrossOrigin
public class BuildController {

    @Autowired
    private BuildService buildService;

    // ✅ Added projectName param
    @PostMapping("/upload")
    public Build uploadBuild(
            @RequestParam("version") String version,
            @RequestParam("projectName") String projectName,
            @RequestParam("file") MultipartFile file) throws IOException {
        return buildService.uploadBuild(version, projectName, file);
    }

    @GetMapping
    public List<Build> getAllBuilds() {
        return buildService.getAllBuilds();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadBuild(@PathVariable Long id) throws IOException {
        Build build = buildService.getBuildById(id);
        File file = new File(build.getFilePath());
        byte[] data = Files.readAllBytes(file.toPath());
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + build.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(data.length)
                .body(resource);
    }
}
package com.bugtracker.bugtracker_backend.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bugtracker.bugtracker_backend.model.Build;
import com.bugtracker.bugtracker_backend.repository.BuildRepository;

@Service
public class BuildService {

    @Autowired
    private BuildRepository buildRepository;

    // ✅ Added projectName parameter
    public Build uploadBuild(String version, String projectName, MultipartFile file) throws IOException {
        String uploadDir = System.getProperty("user.dir")
                + File.separator + "uploads"
                + File.separator + "builds"
                + File.separator;

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);
        file.transferTo(dest);

        Build build = new Build();
        build.setVersion(version);
        build.setProjectName(projectName);  // ✅ save project name
        build.setFileName(fileName);
        build.setFilePath(dest.getAbsolutePath());
        build.setUploadedAt(LocalDateTime.now());

        return buildRepository.save(build);
    }

    public List<Build> getAllBuilds() {
        return buildRepository.findAll();
    }

    public Build getBuildById(Long id) {
        return buildRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Build not found with id: " + id));
    }
}
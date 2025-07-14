package com.example.rrsystem.Controllers.RestaurantOwner.UpdatePersonelInfo;

import com.example.rrsystem.Entities.UserInfo;
import com.example.rrsystem.Repositories.RestaurantOwner.UpdatePersonelInfo.UpdatePersonelInfoRORepository;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.Mail.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

@RestController
@RequestMapping("/api/restaurant-owner/user-info")
public class UpdatePersonelInfoROController {

    private final UpdatePersonelInfoRORepository updatePersonelInfoRORepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public UpdatePersonelInfoROController(UpdatePersonelInfoRORepository updatePersonelInfoRORepository, JwtUtil jwtUtil, EmailService emailService) {
        this.updatePersonelInfoRORepository = updatePersonelInfoRORepository;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @GetMapping("/get-info")
    public ResponseEntity<?> getUserInfo(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        String username = jwtUtil.extractUsername(jwtToken);
        UserInfo user = updatePersonelInfoRORepository.findByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/upload-photo")
    public ResponseEntity<?> uploadPhoto(
            @RequestParam("file") MultipartFile file
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file selected.");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String baseName = originalFilename.substring(0, originalFilename.lastIndexOf(".")).replaceAll("[^a-zA-Z0-9-_]", "_");

        Path uploadPath = Paths.get("src/main/resources/static/images/person");
        Path filePath = uploadPath.resolve(originalFilename);
        int counter = 1;

        while (Files.exists(filePath)) {
            filePath = uploadPath.resolve(baseName + "_" + counter + extension);
            counter++;
        }

        try {
            Files.copy(file.getInputStream(), filePath);
            String fileUrl = "http://localhost:8081/static/images/person/" + filePath.getFileName();
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("path", fileUrl);
            }});
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed.");
        }
    }

    @PutMapping("/update-user-info")
    public ResponseEntity<?> updateUserInfo(
            @CookieValue(value = "jwt", required = false) String jwtToken,
            @RequestBody UserInfo updatedUserInfo
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long userId = jwtUtil.extractUserId(jwtToken);
        UserInfo existingUser = updatePersonelInfoRORepository.findById(userId).orElse(null);

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        UserInfo existingUserWithUsername = updatePersonelInfoRORepository.findByUsernameExceptCurrentUser(updatedUserInfo.getUsername(), userId);
        if (existingUserWithUsername != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new HashMap<String, String>() {{
                        put("error", "Username already exists!");
                    }});
        }

        existingUser.setUsername(updatedUserInfo.getUsername());
        existingUser.setName(updatedUserInfo.getName());
        existingUser.setSurname(updatedUserInfo.getSurname());
        existingUser.setEmail(updatedUserInfo.getEmail());
        existingUser.setPhone(updatedUserInfo.getPhone());
        existingUser.setPhoto(updatedUserInfo.getPhoto());
        existingUser.setDeletedAt(LocalDateTime.now());

        updatePersonelInfoRORepository.save(existingUser);


        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm | dd.MM.yyyy");
        String formattedDateTime = now.format(formatter);

        emailService.sendSimpleEmail("bariscanaslan@outlook.com", "Profile Updated!", "Dear, " + updatedUserInfo.getName() + " " + updatedUserInfo.getSurname() + "\n" + "Your user information updated successfully!\n" + formattedDateTime);

        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "User information updated successfully");
        }});
    }
}


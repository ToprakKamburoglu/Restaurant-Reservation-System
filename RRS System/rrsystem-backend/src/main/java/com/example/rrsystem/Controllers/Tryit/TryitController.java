package com.example.rrsystem.Controllers.Tryit;

import com.example.rrsystem.Entities.Cuisine;
import com.example.rrsystem.Entities.Location;
import com.example.rrsystem.Entities.RestaurantRequest;
import com.example.rrsystem.Repositories.Admin.Manager.AddManagerRepository;
import com.example.rrsystem.Repositories.Tryit.CuisineTryitRepository;
import com.example.rrsystem.Repositories.Tryit.LocationTryitRepository;
import com.example.rrsystem.Repositories.Tryit.TryitRestaurantRepository;
import com.example.rrsystem.Repositories.Tryit.UserTryitRepository;
import com.example.rrsystem.Services.Mail.EmailService;
import com.example.rrsystem.Services.Tryit.TryitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/tryit")
public class TryitController {

    @Autowired
    private CuisineTryitRepository cuisineTryitRepository;

    @Autowired
    private LocationTryitRepository locationTryitRepository;

    @Autowired
    private TryitRestaurantRepository tryitRestaurantRepository;

    @Autowired
    private UserTryitRepository userRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean exists = userRepository.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }
    // Get all cuisines
    @GetMapping("/tryit-cuisine-select")
    public List<Cuisine> getAllCuisines() {
        return cuisineTryitRepository.findByCuisineActiveness();
    }

    // Get all locations
    @GetMapping("/tryit-location-select")
    public List<Location> getAllLocations() {
        return locationTryitRepository.findByLocationActiveness();
    }

    @PostMapping("/send-restaurant-request")
    public ResponseEntity<?> addRestaurantRequest(@RequestBody RestaurantRequest newReservationRequest) {

        Cuisine cuisine = cuisineTryitRepository.findById(newReservationRequest.getCuisine().getId())
                .orElseThrow(() -> new RuntimeException("Cuisine not found"));
        Location location = locationTryitRepository.findById(newReservationRequest.getLocation().getId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        newReservationRequest.setLocation(location);
        newReservationRequest.setCuisine(cuisine);
        newReservationRequest.setRequestSendDate(LocalDateTime.now());

        RestaurantRequest restaurantRequest = tryitRestaurantRepository.save(newReservationRequest);

        emailService.sendSimpleEmail("bariscanaslan@outlook.com","New Restaurant Request Sent!",
                "Dear Manager," + "\n\n" +
                "New restaurant request sent from" + newReservationRequest.getName() + " " + newReservationRequest.getSurname()
                        + " . Please answer that request immediately." +  "\n\n" +
                "provided by rezal ©");

        return ResponseEntity.ok(restaurantRequest);
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
}

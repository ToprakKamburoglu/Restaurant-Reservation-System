package com.example.rrsystem.Controllers.RestaurantOwner.YourAPIKey;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Repositories.RestaurantOwner.YourAPIKey.YourAPIKeyRepository;
import com.example.rrsystem.Security.ApiKeyGenerator;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.Mail.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurant-owner/your-api")
public class YourAPIKeyController {

    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final YourAPIKeyRepository yourAPIKeyRepository;

    public YourAPIKeyController (JwtUtil jwtUtil, EmailService emailService, YourAPIKeyRepository yourAPIKeyRepository) {
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.yourAPIKeyRepository = yourAPIKeyRepository;
    }

    @GetMapping("/get-api-key")
    public ResponseEntity<?> getApiKey(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = yourAPIKeyRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        String apiKey = customer.getApiKey();

        if (apiKey == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Api Key not found");
        }

        return ResponseEntity.ok(apiKey);
    }

    @PutMapping("/regenerate-api-key")
    public ResponseEntity<?> regenerateApiKey(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = yourAPIKeyRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        String apiKey = ApiKeyGenerator.generateApiKey();

        customer.setApiKey(apiKey);
        yourAPIKeyRepository.saveAndFlush(customer);

        return ResponseEntity.ok(customer.getApiKey());
    }
}

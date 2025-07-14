package com.example.rrsystem.Controllers.RestaurantOwner.YourPlan;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.Payment;
import com.example.rrsystem.Entities.UserInfo;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.PaymentUnpaidRestaurantOwnerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UserInfoRepository;
import com.example.rrsystem.Security.CustomerRepository;
import com.example.rrsystem.Security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurant-owner/your-plan")
public class YourPlanController {

    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;
    private final UserInfoRepository userInfoRepository;
    private final PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository;


    public YourPlanController(CustomerRepository customerRepository, JwtUtil jwtUtil, UserInfoRepository userInfoRepository, PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository) {
        this.customerRepository = customerRepository;
        this.jwtUtil = jwtUtil;
        this.userInfoRepository = userInfoRepository;
        this.paymentUnpaidRestaurantOwnerRepository = paymentUnpaidRestaurantOwnerRepository;
    }

    @GetMapping("/customer-plan")
    ResponseEntity<?> getCustomerPlan(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long customerId = jwtUtil.extractCustomerId(jwtToken);

        Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        return ResponseEntity.ok(customer);
    }

    @PutMapping("/cancel-subscription")
    public ResponseEntity<?> cancelSubscription(
            @RequestBody UserInfo userInfo,
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long userId = jwtUtil.extractUserId(jwtToken);
        UserInfo user = userInfoRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        Payment payment = customer.getPayment();
        payment.setActiveQuota(0);
        paymentUnpaidRestaurantOwnerRepository.save(payment);

        user.setUserType(4);
        userInfoRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/change-plan")
    public ResponseEntity<?> changePlan(
            @RequestBody UserInfo userInfo,
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long userId = jwtUtil.extractUserId(jwtToken);
        UserInfo user = userInfoRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        Payment payment = customer.getPayment();
        payment.setActiveQuota(0);
        paymentUnpaidRestaurantOwnerRepository.save(payment);

        user.setUserType(4);
        userInfoRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/add-quota")
    public ResponseEntity<?> addQuota(
            @RequestBody UserInfo userInfo,
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long userId = jwtUtil.extractUserId(jwtToken);
        UserInfo user = userInfoRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        user.setUserType(5);
        userInfoRepository.save(user);

        return ResponseEntity.ok(user);
    }



}

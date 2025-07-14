package com.example.rrsystem.Controllers.UnpaidRestaurantOwner;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.Payment;
import com.example.rrsystem.Entities.Plan;
import com.example.rrsystem.Entities.UserInfo;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.PaymentUnpaidRestaurantOwnerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.PlansRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UpdateCustomerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UserInfoRepository;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.Mail.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/unpaid-restaurant-owner/plans")
public class PlansController {

    private final UpdateCustomerRepository updateCustomerRepository;
    private final PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository;
    private final PlansRepository plansRepository;
    private final UserInfoRepository userInfoRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public PlansController(UpdateCustomerRepository updateCustomerRepository, PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository, PlansRepository plansRepository, UserInfoRepository userInfoRepository, JwtUtil jwtUtil, EmailService emailService) {
        this.updateCustomerRepository = updateCustomerRepository;
        this.paymentUnpaidRestaurantOwnerRepository = paymentUnpaidRestaurantOwnerRepository;
        this.emailService = emailService;
        this.userInfoRepository = userInfoRepository;
        this.jwtUtil = jwtUtil;
        this.plansRepository = plansRepository;
    }

    @GetMapping
    public List<Plan> getAllPlan() {
        return plansRepository.findPlansOrderByIdAsc();
    }

    @PutMapping("/update-plan")
    public ResponseEntity<?> updatePlan(
            @CookieValue(value = "jwt", required = false) String jwtToken,
            @RequestBody Plan selectedPlan
    ) {
        if (jwtToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = updateCustomerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Customer not found");
        }

        Payment payment = customer.getPayment();

        Plan newPlan = plansRepository.findById(selectedPlan.getId()).orElse(null);

        if (newPlan == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Plan not found");
        }

        payment.setPlan(newPlan);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setActiveQuota(newPlan.getPlanQuota() * 12);
        payment.setExpirationDate(LocalDateTime.now().plusYears(1));
        paymentUnpaidRestaurantOwnerRepository.save(payment);

        UserInfo user = userInfoRepository.findById(customer.getUserInfo().getId()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        int userType = user.getUserType();

        if(userType == 4) {
            user.setUserType(3);
            userInfoRepository.save(user);
        }

        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Payment information updated successfully");
        }});
    }
}

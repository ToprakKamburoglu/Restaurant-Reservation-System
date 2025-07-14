package com.example.rrsystem.Controllers.ExpiredQuota;


import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.Payment;
import com.example.rrsystem.Entities.UserInfo;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.PaymentUnpaidRestaurantOwnerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UpdateCustomerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UserInfoRepository;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.Mail.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/expired-quota")
public class BuyQuotaController {

    private final UpdateCustomerRepository updateCustomerRepository;
    private final UserInfoRepository userInfoRepository;
    private final PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public BuyQuotaController(UpdateCustomerRepository updateCustomerRepository, UserInfoRepository userInfoRepository, PaymentUnpaidRestaurantOwnerRepository paymentUnpaidRestaurantOwnerRepository, JwtUtil jwtUtil, EmailService emailService) {
        this.updateCustomerRepository = updateCustomerRepository;
        this.userInfoRepository = userInfoRepository;
        this.paymentUnpaidRestaurantOwnerRepository = paymentUnpaidRestaurantOwnerRepository;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @PutMapping("/buy-quota")
    public ResponseEntity<?> buyQuota(
            @CookieValue(value = "jwt", required = false) String jwtToken,
            @RequestParam("selectedQuota") int selectedQuota
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

        int activeQuota = payment.getActiveQuota();
        int quota = activeQuota + selectedQuota;

        payment.setActiveQuota(quota);
        paymentUnpaidRestaurantOwnerRepository.save(payment);

        UserInfo user = customer.getUserInfo();

        user.setUserType(3);
        userInfoRepository.save(user);

        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Payment information updated successfully");
        }});
    }
}

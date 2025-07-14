package com.example.rrsystem.Controllers.RestaurantOwner.InvoiceCreate;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.Invoices;
import com.example.rrsystem.Entities.UserInfo;
import com.example.rrsystem.Repositories.Admin.Invoices.InvoiceAdminRepository;
import com.example.rrsystem.Repositories.RestaurantOwner.Invoices.InvoiceRestaurantOwnerRepository;
import com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment.UserInfoRepository;
import com.example.rrsystem.Security.CustomerRepository;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.Mail.EmailService;
import org.apache.coyote.Response;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/restaurant-owner/invoices")
public class InvoicesCreateController {

    private final JwtUtil jwtUtil;
    private final CustomerRepository customerRepository;
    private final EmailService emailService;
    private final InvoiceRestaurantOwnerRepository invoiceRestaurantOwnerRepository;
    private final UserInfoRepository userInfoRepository;

    public InvoicesCreateController(InvoiceRestaurantOwnerRepository invoiceRestaurantOwnerRepository, JwtUtil jwtUtil, EmailService emailService, CustomerRepository customerRepository, UserInfoRepository userInfoRepository) {
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.customerRepository = customerRepository;
        this.invoiceRestaurantOwnerRepository = invoiceRestaurantOwnerRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @PostMapping("/create-invoice")
    public ResponseEntity<?> createInvoice(
            @RequestBody Invoices invoices,
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

        invoices.setCustomer(customer);
        invoices.setPaymentDate(LocalDateTime.now());
        Invoices savedInvoice = invoiceRestaurantOwnerRepository.save(invoices);
        return ResponseEntity.ok(savedInvoice);
    }
}

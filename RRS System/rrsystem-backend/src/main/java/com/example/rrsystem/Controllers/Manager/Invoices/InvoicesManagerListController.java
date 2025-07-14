package com.example.rrsystem.Controllers.Manager.Invoices;

import com.example.rrsystem.Entities.Invoices;
import com.example.rrsystem.Repositories.RestaurantOwner.Invoices.InvoiceRestaurantOwnerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager/invoices")
public class InvoicesManagerListController {

    private final InvoiceRestaurantOwnerRepository invoiceRepository;

    public InvoicesManagerListController(InvoiceRestaurantOwnerRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping
    public List<Map<String, Object>> getAllInvoices(){
        List<Object[]> results = invoiceRepository.findAllInvoices();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("serviceName", row[0]);
            map.put("amountPaid", row[1]);
            map.put("billingAddress", row[2]);
            map.put("city", row[3]);
            map.put("postalCode", row[4]);
            map.put("emailAddress", row[5]);
            map.put("paymentDate", row[6]);
            map.put("name", row[7]);
            map.put("surname", row[8]);
            response.add(map);
        }
        return response;
    }

}

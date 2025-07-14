package com.example.rrsystem.Controllers.Admin.InvoiceList;

import com.example.rrsystem.Entities.Invoices;
import com.example.rrsystem.Repositories.Admin.Invoices.InvoiceAdminRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/invoices")
public class InvoicesAdminListController {

    private final InvoiceAdminRepository invoiceAdminRepository;

    public InvoicesAdminListController(InvoiceAdminRepository invoiceAdminRepository) {
        this.invoiceAdminRepository = invoiceAdminRepository;
    }

    @GetMapping
    public List<Invoices> getAllInvoices() {
        return invoiceAdminRepository.findAllInvoices();
    }

}

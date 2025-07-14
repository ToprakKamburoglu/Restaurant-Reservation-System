package com.example.rrsystem.Repositories.Admin.Invoices;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.Invoices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceAdminRepository extends JpaRepository<Invoices, Long> {
    @Query("SELECT i FROM Invoices i LEFT JOIN FETCH i.customer ORDER BY i.paymentDate DESC")
    List<Invoices> findAllInvoices();
}

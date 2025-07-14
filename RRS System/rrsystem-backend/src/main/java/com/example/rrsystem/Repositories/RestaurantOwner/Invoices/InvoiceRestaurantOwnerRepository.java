package com.example.rrsystem.Repositories.RestaurantOwner.Invoices;

import com.example.rrsystem.Entities.Invoices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceRestaurantOwnerRepository extends JpaRepository<Invoices, Long> {

    @Query("SELECT i.serviceName, i.amountPaid, i.billingAddress, i.city, i.postalCode, i.emailAddress, i.paymentDate, i.customer.user.name, i.customer.user.surname FROM Invoices i ORDER BY i.customer.user.name")
    List<Object[]> findAllInvoices();
}

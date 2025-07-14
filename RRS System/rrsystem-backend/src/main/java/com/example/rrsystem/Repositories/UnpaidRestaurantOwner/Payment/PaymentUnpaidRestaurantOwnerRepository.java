package com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment;

import com.example.rrsystem.Entities.Payment;
import com.example.rrsystem.Entities.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentUnpaidRestaurantOwnerRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p WHERE p.plan = :plan")
    Payment findPaymentByPlan(Plan plan);
}

package com.example.rrsystem.Repositories.Reservation;

import com.example.rrsystem.Entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface PaymentReservationRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.plan.id = :planId AND p.expirationDate > :now")
    Integer countByPlanId(
            @Param("planId") Long planId,
            @Param("now") LocalDateTime now);



}

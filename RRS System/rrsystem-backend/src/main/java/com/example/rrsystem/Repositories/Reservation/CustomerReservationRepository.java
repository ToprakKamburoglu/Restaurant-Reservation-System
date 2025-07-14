package com.example.rrsystem.Repositories.Reservation;

import com.example.rrsystem.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerReservationRepository extends JpaRepository<Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE c.restaurant.id = :restaurantId")
    Customer findByRestaurantId(Long restaurantId);

    Optional<Customer> findByApiKey(String apiKey);
}

package com.example.rrsystem.Repositories.UnpaidRestaurantOwner.Payment;

import com.example.rrsystem.Entities.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlansRepository extends JpaRepository<Plan, Long> {

    @Query("SELECT p FROM Plan p ORDER BY p.id ASC")
    List<Plan> findPlansOrderByIdAsc();
}

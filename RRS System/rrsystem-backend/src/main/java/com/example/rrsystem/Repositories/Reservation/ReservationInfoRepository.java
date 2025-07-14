package com.example.rrsystem.Repositories.Reservation;

import com.example.rrsystem.Entities.ReservationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservationInfoRepository extends JpaRepository<ReservationInfo, Long> {

    @Query("SELECT r FROM ReservationInfo r " +
            "WHERE r.restaurant.id = :restaurantId " +
            "AND r.session.sessionDate = :sessionDate " +
            "AND r.session.sessionStart < :endTime " +
            "AND r.session.sessionEnd > :startTime")
    List<ReservationInfo> findReservationsForSession(
            @Param("restaurantId") Long restaurantId,
            @Param("sessionDate") Date sessionDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    @Query("SELECT COUNT(r) FROM ReservationInfo r " +
    "WHERE r.restaurant.id = :restaurantId " +
    "AND r.session.sessionDate BETWEEN :startDate AND :endDate")
     Integer countByRestaurantId(
         @Param("restaurantId") Long restaurantId,
         @Param("startDate") LocalDate startDate,
         @Param("endDate") LocalDate endDate);
}

package com.example.rrsystem.Repositories.RestaurantOwner.Reservations;

import com.example.rrsystem.Entities.ReservationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarViewRepository extends JpaRepository<ReservationInfo, Long> {

    @Query("SELECT r.session.sessionDate, " +
            "r.session.sessionStart, " +
            "r.session.sessionEnd, " +
            "r.restaurant.id, " +
            "r.name, r.surname, r.email, " +
            "r.phone, r.note, r.peopleNo, r.tableIds " +
            "FROM ReservationInfo r " +
            "WHERE r.restaurant.id = :restaurantId " +
            "ORDER BY r.session.sessionDate DESC")
    List<Object[]> findActiveCalendarViewByRestaurantId(@Param("restaurantId")Long restaurantId);
}
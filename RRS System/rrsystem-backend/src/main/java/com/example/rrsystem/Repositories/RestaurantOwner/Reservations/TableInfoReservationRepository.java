package com.example.rrsystem.Repositories.RestaurantOwner.Reservations;

import com.example.rrsystem.Entities.TableInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TableInfoReservationRepository extends JpaRepository<TableInfo, Long> {

    @Query("SELECT t.id AS tableId, t.tableName AS tableName, t.tableCapacity AS tableCapacity, t.restaurant.id AS restaurantId " +
            "FROM TableInfo t " +
            "WHERE t.restaurant.id = :restaurantId" +
            " ORDER BY t.tableName ASC")
    List<Object[]> findTableDetailsByRestaurantId(@Param("restaurantId") Long restaurantId);
}

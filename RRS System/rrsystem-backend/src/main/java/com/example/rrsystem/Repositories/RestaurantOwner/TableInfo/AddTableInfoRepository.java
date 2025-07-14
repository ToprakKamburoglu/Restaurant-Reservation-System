package com.example.rrsystem.Repositories.RestaurantOwner.TableInfo;

import com.example.rrsystem.Entities.TableInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddTableInfoRepository extends JpaRepository<TableInfo, Long> {

    @Query("SELECT COUNT(t) > 0 FROM TableInfo t WHERE t.tableName = :tableName AND t.restaurant.id = :restaurantId")
    boolean existsByTableNameAndRestaurantId(@Param("tableName") String tableName, @Param("restaurantId") Long restaurantId);
}

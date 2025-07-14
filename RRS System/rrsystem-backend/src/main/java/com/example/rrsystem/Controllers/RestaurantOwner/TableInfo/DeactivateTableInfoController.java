package com.example.rrsystem.Controllers.RestaurantOwner.TableInfo;

import com.example.rrsystem.Entities.TableInfo;
import com.example.rrsystem.Repositories.RestaurantOwner.TableInfo.ActivateTableInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/restaurant-owner/tables")
public class DeactivateTableInfoController {

    @Autowired
    ActivateTableInfoRepository activateTableInfoRepository;

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateSession(@PathVariable Long id) {

        TableInfo tableInfo = activateTableInfoRepository.findById(id).orElse(null);
        if (tableInfo != null) {
            activateTableInfoRepository.delete(tableInfo);
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.status(404).body("{\"success\": false, \"message\": \"Customer not found\"}");
        }
    }
}

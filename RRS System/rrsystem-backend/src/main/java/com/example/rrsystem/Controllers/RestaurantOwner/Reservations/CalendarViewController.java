package com.example.rrsystem.Controllers.RestaurantOwner.Reservations;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.RestaurantInfo;
import com.example.rrsystem.Security.CustomerRepository;
import com.example.rrsystem.Security.JwtUtil;
import com.example.rrsystem.Services.RestaurantOwner.Reservations.CalendarViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/restaurant-owner/calendar")
public class CalendarViewController {

    private final CalendarViewService calendarViewService;
    private final JwtUtil jwtUtil;
    private final CustomerRepository customerRepository;

    public CalendarViewController(CalendarViewService calendarViewService, JwtUtil jwtUtil, CustomerRepository customerRepository) {
        this.jwtUtil = jwtUtil;
        this.calendarViewService = calendarViewService;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/get-restaurant-id")
    public Long getUserId(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return -1L;
        }

        Long restaurantId = customer.getRestaurant().getId();

        if (restaurantId == null) {
            return -1L;
        }

        return restaurantId;
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<?> getCalendarByRestaurantId(@PathVariable Long restaurantId) {
        try {
            List<Object[]> rows = calendarViewService.getCalendarByRestaurantId(restaurantId);
            List<Map<String, Object>> result = new ArrayList<>();

            for (Object[] row : rows) {
                Map<String, Object> item = new HashMap<>();
                item.put("sessionDate", row[0]);
                item.put("sessionStart", row[1]);
                item.put("sessionEnd", row[2]);
                item.put("restaurantId", row[3]);
                item.put("reservationName", row[4]);
                item.put("reservationSurname", row[5]);
                item.put("reservationEmail", row[6]);
                item.put("reservationPhone", row[7]);
                item.put("reservationNote", row[8]);
                item.put("reservationPeopleNo", row[9]);
                item.put("reservationTableIds", row[10]);
                result.add(item);
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("An error occurred while retrieving calendar data: " + e.getMessage());
        }
    }

    @GetMapping("/{restaurantId}/tables")
    public ResponseEntity<?> getTableDetailsByRestaurantId(@PathVariable Long restaurantId) {
        try {
            List<Object[]> rows = calendarViewService.getTableDetailsByRestaurantId(restaurantId);
            List<Map<String, Object>> result = new ArrayList<>();

            for (Object[] row : rows) {
                Map<String, Object> item = new HashMap<>();
                item.put("tableId", row[0]);
                item.put("tableName", row[1]);
                item.put("tableCapacity", row[2]);
                item.put("restaurantId", row[3]);
                result.add(item);
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("An error occurred while retrieving table details: " + e.getMessage());
        }
    }
}
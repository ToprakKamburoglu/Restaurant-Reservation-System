package com.example.rrsystem.Controllers.Reservation;
import com.example.rrsystem.Entities.ReservationInfo;
import com.example.rrsystem.Entities.ReservationRequest;
import com.example.rrsystem.Entities.TableInfo;
import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Repositories.Reservation.ReservationInfoRepository;
import com.example.rrsystem.Repositories.Reservation.SessionInfoRepository;
import com.example.rrsystem.Repositories.Reservation.TableInfoRepository;
import com.example.rrsystem.Services.Mail.EmailService;
import com.example.rrsystem.Services.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/embedded")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private TableInfoRepository tableInfoRepository;

    @Autowired
    private SessionInfoRepository sessionRepository;

    @Autowired
    private ReservationInfoRepository reservationRepository;

    @GetMapping("/available-tables")
    public List<TableInfo> getAvailableTables(
            @RequestParam String apiKey,
            @RequestParam int peopleNo,
            @RequestParam Date sessionDate,
            @RequestParam LocalTime sessionStart,
            @RequestParam LocalTime sessionEnd
    ) {
        Customer customer = reservationService.getCustomerByApiKey(apiKey);
        Long restaurantId = customer.getRestaurant().getId();

        List<ReservationInfo> overlappingReservations = reservationRepository.findReservationsForSession(
                restaurantId, sessionDate, sessionStart, sessionEnd
        );

        Set<Long> reservedTableIds = new HashSet<>();
        for (ReservationInfo r : overlappingReservations) {
            if (r.getTableIds() != null && !r.getTableIds().isEmpty()) {
                for (String idStr : r.getTableIds().split(",")) {
                    reservedTableIds.add(Long.parseLong(idStr));
                }
            }
        }

        List<TableInfo> availableTables = tableInfoRepository.findActiveTablesByRestaurantId(restaurantId)
                .stream()
                .filter(table -> !reservedTableIds.contains(table.getId()))
                .filter(table -> table.getTableCapacity() >= 1)
                .collect(Collectors.toList());

        return availableTables;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createReservation(
            @RequestParam("apiKey") String apiKey,
            @RequestBody ReservationInfo reservationInfo
    ) {
        return reservationService.createReservationWithApiKey(apiKey, reservationInfo);
    }
}
package com.example.rrsystem.Controllers.Reservation;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.SessionInfo;
import com.example.rrsystem.Repositories.Reservation.SessionInfoRepository;
import com.example.rrsystem.Services.Reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/embedded")
public class QuerySessionsController {

    private final SessionInfoRepository sessionInfoRepository;
    private final ReservationService reservationService;

    @Autowired
    public QuerySessionsController(SessionInfoRepository sessionInfoRepository, ReservationService reservationService) {
        this.sessionInfoRepository = sessionInfoRepository;
        this.reservationService = reservationService;
    }

    @GetMapping("/sessions")
    public List<SessionInfo> getSessionsByApiKey(
            @RequestParam("apiKey") String apiKey,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        Customer customer = reservationService.getCustomerByApiKey(apiKey);
        Long restaurantId = customer.getRestaurant().getId();

        List<SessionInfo> sessionInfos = sessionInfoRepository.findActiveSessionsByRestaurantAndDate(restaurantId, date);

        return sessionInfos;
    }
}

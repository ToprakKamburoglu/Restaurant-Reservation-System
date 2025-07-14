package com.example.rrsystem.Controllers.RestaurantOwner.Reservations;

import com.example.rrsystem.Entities.Customer;
import com.example.rrsystem.Entities.RestaurantInfo;
import com.example.rrsystem.Repositories.Reservation.ReservationInfoRepository;
import com.example.rrsystem.Security.CustomerRepository;
import com.example.rrsystem.Security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/restaurant-owner/reservation-analysis")
public class ReservationAnalysisController {

    private final JwtUtil jwtUtil;
    private final ReservationInfoRepository reservationInfoRepository;
    private final CustomerRepository customerRepository;

    public ReservationAnalysisController(JwtUtil jwtUtil, ReservationInfoRepository reservationInfoRepository, CustomerRepository customerRepository) {
        this.jwtUtil = jwtUtil;
        this.reservationInfoRepository = reservationInfoRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/periodic-reservations")
    public Map<String, Integer> getPeriodicReservations(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        Long customerId = jwtUtil.extractCustomerId(jwtToken);

        Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer == null) {
            return null;
        }

        RestaurantInfo restaurantInfo = customer.getRestaurantInfo();

        if (restaurantInfo == null) {
            return null;
        }

        Long restaurantId = restaurantInfo.getId();

        LocalDate today = LocalDate.now();
        LocalDate oneWeekAgo = today.minusWeeks(1);
        LocalDate oneMonthAgo = today.minusMonths(1);

        Map<String, Integer> statistics = new HashMap<>();

        Integer dailyReservations = reservationInfoRepository.countByRestaurantId(restaurantId,today,today.plusDays(1));
        Integer weeklyReservations = reservationInfoRepository.countByRestaurantId(restaurantId,oneWeekAgo,today);
        Integer monthlyReservations = reservationInfoRepository.countByRestaurantId(restaurantId,oneMonthAgo,today);

        statistics.put("dailyReservations", dailyReservations);
        statistics.put("weeklyReservations", weeklyReservations);
        statistics.put("monthlyReservations", monthlyReservations);
        statistics.put("totalReservations", dailyReservations + weeklyReservations + monthlyReservations);

        return statistics;
    }

    @GetMapping("/monthly-reservations")
    public Map<String, Integer> getMonthlyReservations(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        int year = LocalDate.now().getYear();
        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer == null || customer.getRestaurantInfo() == null) return null;
        Long restaurantId = customer.getRestaurantInfo().getId();

        Map<String, Integer> monthlyStats = new LinkedHashMap<>();
        for (int month = 1; month <= 12; month++) {
            LocalDate start = LocalDate.of(year, month, 1);
            LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
            Integer count = reservationInfoRepository.countByRestaurantId(
                    restaurantId, start, end
            );
            monthlyStats.put(String.valueOf(month), count != null ? count : 0);
        }
        return monthlyStats;
    }

    @GetMapping("/weekly-reservations")
    public Map<String, Integer> getWeeklyReservations(
            @CookieValue(value = "jwt", required = false) String jwtToken
    ) {
        Long customerId = jwtUtil.extractCustomerId(jwtToken);
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer == null || customer.getRestaurantInfo() == null) return null;
        Long restaurantId = customer.getRestaurantInfo().getId();

        Map<String, Integer> dailyStats = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            Integer count = reservationInfoRepository.countByRestaurantId(
                    restaurantId, day, day
            );
            dailyStats.put(day.getDayOfWeek().toString(), count != null ? count : 0);
        }
        return dailyStats;
    }

}

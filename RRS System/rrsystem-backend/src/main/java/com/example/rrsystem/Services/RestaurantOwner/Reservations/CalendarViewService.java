package com.example.rrsystem.Services.RestaurantOwner.Reservations;

import com.example.rrsystem.Repositories.RestaurantOwner.Reservations.CalendarViewRepository;
import com.example.rrsystem.Repositories.RestaurantOwner.Reservations.TableInfoReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarViewService {

    private final TableInfoReservationRepository tableInfoReservationRepository;

    private final CalendarViewRepository calendarViewRepository;

    public CalendarViewService(CalendarViewRepository calendarViewRepository, TableInfoReservationRepository tableInfoReservationRepository) {
        this.calendarViewRepository = calendarViewRepository;
        this.tableInfoReservationRepository = tableInfoReservationRepository;
    }

    public List<Object[]> getCalendarByRestaurantId(Long restaurantId) {
        return calendarViewRepository.findActiveCalendarViewByRestaurantId(restaurantId);
    }

    public List<Object[]> getTableDetailsByRestaurantId(Long restaurantId) {
        return tableInfoReservationRepository.findTableDetailsByRestaurantId(restaurantId);
    }
}
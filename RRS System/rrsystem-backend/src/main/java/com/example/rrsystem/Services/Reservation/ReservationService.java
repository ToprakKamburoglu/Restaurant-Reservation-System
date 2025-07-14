package com.example.rrsystem.Services.Reservation;
import com.example.rrsystem.Entities.*;
import com.example.rrsystem.Repositories.Reservation.*;
import com.example.rrsystem.Services.Mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private CustomerReservationRepository customerReservationRepository;

    @Autowired
    private PaymentReservationRepository paymentReservationRepository;

    @Autowired
    private ReservationInfoRepository reservationRepository;

    @Autowired
    private TableInfoRepository tableInfoRepository;

    @Autowired
    private SessionInfoRepository sessionRepository;

    @Autowired
    private EmailService emailService;

    public Customer getCustomerByApiKey(String apiKey) {
        return customerReservationRepository.findByApiKey(apiKey)
                .orElseThrow(() -> new RuntimeException("Invalid API Key"));
    }

    public ResponseEntity<?> createReservationWithApiKey(String apiKey, ReservationInfo reservationInfo) {
        Customer customer = getCustomerByApiKey(apiKey);
        RestaurantInfo restaurant = customer.getRestaurant();
        reservationInfo.setRestaurant(restaurant);

        try {
            Long sessionId = reservationInfo.getSession().getId();
            int peopleNo = reservationInfo.getPeopleNo();
            Long restaurantId = reservationInfo.getRestaurant().getId();

            SessionInfo session = sessionRepository.findById(sessionId)
                    .orElseThrow(() -> new RuntimeException("Session not found"));

            List<ReservationInfo> overlappingReservations = reservationRepository.findReservationsForSession(
                    restaurantId,
                    session.getSessionDate(),
                    session.getSessionStart(),
                    session.getSessionEnd()
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
                    .collect(Collectors.toList());

            int remainingGuests = peopleNo;
            List<Long> selectedTableIds = new ArrayList<>();

            for (TableInfo table : availableTables) {
                if (remainingGuests <= 0) break;
                selectedTableIds.add(table.getId());
                remainingGuests -= table.getTableCapacity();
            }

            if (remainingGuests > 0) {
                throw new IllegalArgumentException("No tables of sufficient capacity were found. Please try again with fewer people.");
            }

            reservationInfo.setSession(session);
            reservationInfo.setRestaurant(session.getRestaurant());
            reservationInfo.setTableIds(selectedTableIds.stream().map(String::valueOf).collect(Collectors.joining(",")));
            reservationInfo.setSendDate(LocalDateTime.now());

            reservationRepository.save(reservationInfo);

            Payment payment = customer.getPayment();

            int activeQuota = payment.getActiveQuota();
            payment.setActiveQuota(activeQuota - 1);
            paymentReservationRepository.save(payment);

            String note = reservationInfo.getNote();

            SimpleDateFormat formatterDate = new SimpleDateFormat("dd.MM.yyyy");
            DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("HH:mm");

            String formattedDate = formatterDate.format(reservationInfo.getSession().getSessionDate());
            String formattedTime = (reservationInfo.getSession().getSessionStart()).format(formatterTime);

            emailService.sendSimpleEmail("iletisim@bariscanaslan.com", "Your Reservation Successfully Created!",
                    "Dear " + reservationInfo.getName() + " " + reservationInfo.getSurname() + "," + "\n\n" +
                            "Your " + reservationInfo.getRestaurant().getRestaurantName() + " reservation successfully created. \n\nReservation information:\n" +
                            "Date: " + formattedDate + "\n" +
                            "Time: " + formattedTime + "\n" +
                            "Number of Guests: " + reservationInfo.getPeopleNo() + "\n" +
                            "Special Request / Note: " + note + "\n\n" +
                            "Thanks for your choice. Please contact the restaurant in case of any problems. Restaurant Phone Number: "
                            + reservationInfo.getRestaurant().getRestaurantPhone() + "\n\n" + "provided by rezal ©");

            UserInfo user = reservationInfo.getRestaurant().getUserInfo();

            emailService.sendSimpleEmail("iletisim@bariscanaslan.com", "New Reservation!",
                    "Dear " + user.getName() + " " + user.getSurname() + "," + "\n\n" +
                            "You have a new reservation for your restaurant! " + " \n\nReservation information:\n" +
                            "Date: " + formattedDate + "\n" +
                            "Time: " + formattedTime + "\n" +
                            "Number of Guests: " + reservationInfo.getPeopleNo() + "\n" +
                            "Special Request / Note: " + note + "\n\n" +
                            "Please contact the customer if you need. Customer Phone Number: "
                            + reservationInfo.getPhone() + "\n\n" + "provided by rezal ©");

            return ResponseEntity.ok("Reservation successfully created.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}

package com.example.rrsystem.Services.RestaurantOwner.Reservations;

import com.example.rrsystem.Entities.ReservationInfo;
import com.example.rrsystem.Entities.TableInfo;
import com.example.rrsystem.Repositories.Reservation.ReservationInfoRepository;
import com.example.rrsystem.Repositories.Reservation.TableInfoRepository;
import com.example.rrsystem.Services.Mail.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CancelReservationService {

    private final ReservationInfoRepository reservationInfoRepository;
    private final TableInfoRepository tableInfoRepository;
    private final EmailService emailService;


    public CancelReservationService(ReservationInfoRepository reservationInfoRepository, TableInfoRepository tableInfoRepository, EmailService emailService) {
        this.reservationInfoRepository = reservationInfoRepository;
        this.tableInfoRepository = tableInfoRepository;
        this.emailService = emailService;
    }

    public void sendCancelEmail(Long reservationId) {

        ReservationInfo reservationInfo = reservationInfoRepository.findById(reservationId).orElse(null);

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm | dd.MM.yyyy");
        String formattedDateTime = now.format(formatter);

        if (reservationInfo == null) {
            return;
        }

        String formattedReservationTime = reservationInfo.getSendDate().format(formatter);

        emailService.sendSimpleEmail(reservationInfo.getEmail(),"Your Reservation Cancelled!",
                "Dear " + reservationInfo.getName() + " " + reservationInfo.getSurname() + ", " + "\n\n" +
                        "Your reservation at " + reservationInfo.getRestaurant().getRestaurantName() + " restaurant " +
                        "for " + formattedReservationTime +
                        " has been cancelled by restaurant owner.\n" +
                        "If you have not received a phone call from the restaurant owner before this cancellation, please contact us.\n" +
                        "Contact Email: contact@rezal.info" + "\n\n" +
                        formattedDateTime + "\n\n" +
                        "provided by rezal ©");
    }

    @Transactional
    public boolean cancelReservation(Long reservationId) {
        try {
            ReservationInfo reservation = reservationInfoRepository.findById(reservationId)
                    .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + reservationId));

            if (reservation.getTableIds() != null && !reservation.getTableIds().isEmpty()) {
                String[] tableIdArray = reservation.getTableIds().split(",");

                for (String tableIdStr : tableIdArray) {
                    Long tableId = Long.parseLong(tableIdStr.trim());
                    TableInfo table = tableInfoRepository.findById(tableId).orElse(null);

                    if (table != null) {
                        table.setTableAvailable(1);
                        table.setTableDeletion(LocalDateTime.now());
                        tableInfoRepository.save(table);
                    }
                }
            }
            reservationInfoRepository.delete(reservation);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

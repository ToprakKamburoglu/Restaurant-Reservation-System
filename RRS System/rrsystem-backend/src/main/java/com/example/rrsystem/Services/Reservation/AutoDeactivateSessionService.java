package com.example.rrsystem.Services.Reservation;

import com.example.rrsystem.Entities.ReservationInfo;
import com.example.rrsystem.Entities.SessionInfo;
import com.example.rrsystem.Entities.TableInfo;
import com.example.rrsystem.Repositories.Reservation.ReservationInfoRepository;
import com.example.rrsystem.Repositories.Reservation.SessionInfoRepository;
import com.example.rrsystem.Repositories.Reservation.TableInfoRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AutoDeactivateSessionService {

    private static final Logger logger = LoggerFactory.getLogger(AutoDeactivateSessionService.class);

    @Autowired
    private SessionInfoRepository sessionInfoRepository;

    @PostConstruct
    public void runOnStartup() {
        logger.info("Running table activation at startup...");
        deactivateSessions();
    }

    @Scheduled(cron = "0 0/15 * * * ?")
    public void activateTablesForExpiredReservations() {
        deactivateSessions();
    }

    private void deactivateSessions() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate nowDate = now.toLocalDate();
        logger.info("Scheduled task started at {}", now);

        try {
            List<SessionInfo> sessions = sessionInfoRepository.findCheckedSessions();
            for (SessionInfo session : sessions) {

                if(session.getIsCheckedBySystem() == 1) {
                    logger.info("Session was already checked with ID: {}", session.getId());
                }

                else {
                    LocalDate sessionDate = session.getSessionDate().toLocalDate();
                    LocalTime sessionStart = session.getSessionStart();
                    LocalTime sessionEnd = session.getSessionEnd();

                    LocalDateTime sessionStartDateTime = sessionDate.atTime(sessionStart);
                    LocalDateTime sessionEndDateTime = sessionDate.atTime(sessionEnd);

                    if(session.getSessionActiveness() == 1) {
                        if (sessionEnd.isBefore(sessionStart)) {
                            sessionEndDateTime = sessionEndDateTime.plusDays(1);
                        }

                        if (sessionDate.isBefore(now.toLocalDate()) ||
                                (sessionDate.isEqual(now.toLocalDate()) && sessionEndDateTime.isBefore(now))) {

                            session.setSessionActiveness(0);
                            session.setSessionDeletion(LocalDateTime.now());
                            logger.info("Session deactived with ID: {}", session.getId());
                            sessionInfoRepository.save(session);

                            session.setIsCheckedBySystem(1);
                            sessionInfoRepository.save(session);
                        }
                    } else {
                        logger.info("Session is already deactive with ID: {}", session.getId());
                    }
                }

            }

        } catch (Exception e) {
            logger.error("Error occurred while processing expired reservations: {}", e.getMessage(), e);
        }
    }
}

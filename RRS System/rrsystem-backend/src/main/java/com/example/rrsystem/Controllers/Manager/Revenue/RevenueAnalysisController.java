package com.example.rrsystem.Controllers.Manager.Revenue;


import com.example.rrsystem.Entities.Plan;
import com.example.rrsystem.Repositories.Admin.Plan.PlanRepository;
import com.example.rrsystem.Repositories.Reservation.PaymentReservationRepository;
import com.example.rrsystem.Repositories.Reservation.ReservationInfoRepository;
import com.example.rrsystem.Security.CustomerRepository;
import com.example.rrsystem.Security.JwtUtil;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/manager/revenue-analysis")
public class RevenueAnalysisController {


    private final PaymentReservationRepository paymentReservationRepository;
    private final PlanRepository planRepository;

    public RevenueAnalysisController (PaymentReservationRepository paymentReservationRepository, PlanRepository planRepository) {
        this.paymentReservationRepository = paymentReservationRepository;
        this.planRepository = planRepository;
    }

    @GetMapping("/plan-customers")
    public Map<String, Integer> getPlanCustomers() {

        Plan standardPlan = planRepository.findById(1L).orElse(null);
        Plan advancedPlan = planRepository.findById(2L).orElse(null);
        Plan premiumPlan = planRepository.findById(3L).orElse(null);

        if (standardPlan == null || advancedPlan == null || premiumPlan == null) {
            return new HashMap<>();
        }

        Integer standardPlanPrice = standardPlan.getPlanPrice();
        Integer advancedPlanPrice = advancedPlan.getPlanPrice();
        Integer premiumPlanPrice = premiumPlan.getPlanPrice();

        Map<String, Integer> planCustomers = new HashMap<>();

        LocalDateTime today = LocalDateTime.now();

        Integer standardPlanCount =  paymentReservationRepository.countByPlanId(1L, today);
        Integer advancedPlanCount = paymentReservationRepository.countByPlanId(2L, today);
        Integer premiumPlanCount = paymentReservationRepository.countByPlanId(3L, today);

        planCustomers.put("standardPlanCount", standardPlanCount);
        planCustomers.put("advancedPlanCount", advancedPlanCount);
        planCustomers.put("premiumPlanCount", premiumPlanCount);
        planCustomers.put("standardPlanPrice", standardPlanPrice);
        planCustomers.put("advancedPlanPrice", advancedPlanPrice);
        planCustomers.put("premiumPlanPrice", premiumPlanPrice);

        return planCustomers;
    }
}

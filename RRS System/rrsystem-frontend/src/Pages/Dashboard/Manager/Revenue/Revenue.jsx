import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

import Chart from "chart.js/auto";

function Revenue() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const [planData, setPlanData] = useState({
        standardPlanCount: 0,
        advancedPlanCount: 0,
        premiumPlanCount: 0,
        standardPlanPrice: 0,
        advancedPlanPrice: 0,
        premiumPlanPrice: 0,
    });

    useEffect(() => {
        fetch("http://localhost:8081/api/manager/revenue-analysis/plan-customers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",},
            credentials: "include",
            
        })
            .then(res => res.json())
            .then(data => setPlanData(data))
            .catch(err => console.error("API error:", err));
    }, []);

    const planRevenue = [
        {
            id: 1,
            plan: "Standard Plan Total",
            value: (planData.standardPlanCount * planData.standardPlanPrice)
        },
        {
            id: 2,
            plan: "Advanced Plan Total",
            value: (planData.advancedPlanCount * planData.advancedPlanPrice)
        },
        {
            id: 3,
            plan: "Premium Plan Total",
            value: (planData.premiumPlanCount * planData.premiumPlanPrice)
        }
    ];

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: planRevenue.map(item => item.plan),
                datasets: [{
                    label: 'Plan Revenue',
                    data: planRevenue.map(item => item.value),
                    backgroundColor: [
                        "#025596",
                        "#b2ccdf",
                        "#6799c0"
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            font: {
                                size: 18,
                                weight: "bold",
                            },
                            color: "#333",
                        },
                    },
                    tooltip: {
                        titleFont: { size: 18 },
                        bodyFont: { size: 18 },
                        backgroundColor: "rgba(0,0,0,0.7)",
                        titleColor: "#fff",
                        bodyColor: "#ddd",
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [planData]);

    const totalCustomers = planData.standardPlanCount + planData.advancedPlanCount + planData.premiumPlanCount;

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Revenue</h1>
                <div className="card-container-revenue">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card card-revenue">
                                    <div className="card-body card-body-revenue">
                                        <h4 className="card-title-revenue">Standard Plan Customers</h4>
                                        <p className="card-text-revenue">Number of customers with Standard Plan</p>  
                                        <div className="form-group">
                                            <label className="card-label-revenue" htmlFor="standard-revenue">
                                                {planData.standardPlanCount}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-revenue">
                                    <div className="card-body card-body-revenue">
                                        <h4 className="card-title-revenue">Advanced Plan Customers</h4>
                                        <p className="card-text-revenue">Number of customers with Advanced Plan</p>
                                        <div className="form-group">
                                            <label className="card-label-revenue" htmlFor="advanced-revenue">
                                                {planData.advancedPlanCount}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-revenue">
                                    <div className="card-body card-body-revenue">
                                        <h4 className="card-title-revenue">Premium Plan Customers</h4>
                                        <p className="card-text-revenue">Number of customers with Premium Plan</p>
                                        <div className="form-group">
                                            <label className="card-label-revenue" htmlFor="premium-revenue">
                                                {planData.premiumPlanCount}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-revenue">
                                    <div className="card-body card-body-revenue">
                                        <h4 className="card-title-revenue">Number of Customers</h4>
                                        <p className="card-text-revenue">Number of active customers</p>
                                        <div className="form-group">
                                            <label className="card-label-revenue" htmlFor="total-revenue">
                                                {totalCustomers}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center">
                    <div className="chart-revenue-div">
                        <h2 className="chart-revenue-title">Revenue ($)</h2>
                        <div className="chart-container chart-revenue-1">
                            <canvas className="canvas-2" ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Revenue;

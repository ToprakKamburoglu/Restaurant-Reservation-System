import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

import Chart from "chart.js/auto";

function ReservationAnalysis() {
    const monthlyChartRef = useRef(null);
    const monthlyChartInstance = useRef(null);
    const weeklyChartRef = useRef(null);
    const weeklyChartInstance = useRef(null);

    const [statistics, setStatistics] = useState({
        dailyReservations: 0,
        weeklyReservations: 0,
        monthlyReservations: 0,
        totalReservations: 0,
    });

    const [monthlyData, setMonthlyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [weeklyLabels, setWeeklyLabels] = useState([]);
    const [monthlyLabels, setMonthlyLabels] = useState([
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]);

    useEffect(() => {
        fetch("http://localhost:8081/api/restaurant-owner/reservation-analysis/monthly-reservations?year=2024", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                // data: { "1": 10, "2": 20, ... }
                setMonthlyData(Object.values(data));
            });
    
        fetch("http://localhost:8081/api/restaurant-owner/reservation-analysis/weekly-reservations", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                // data: { "MONDAY": 5, "TUESDAY": 7, ... }
                setWeeklyLabels(Object.keys(data).map(day => day.charAt(0) + day.slice(1).toLowerCase()));
                setWeeklyData(Object.values(data));
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8081/api/restaurant-owner/reservation-analysis/periodic-reservations", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) setStatistics(data);
            })
            .catch((err) => {
                console.error("API error:", err);
            });
    }, []);


    useEffect(() => {
        if (monthlyChartInstance.current) {
            monthlyChartInstance.current.destroy();
        }
        const ctx = monthlyChartRef.current.getContext("2d");
        monthlyChartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: monthlyLabels,
                datasets: [
                    {
                        label: "Total Reservations",
                        data: monthlyData,
                        backgroundColor: ["#025596", "#b2ccdf", "#6799c0", "#2a70a6"],
                        borderColor: ["#025596", "#b2ccdf", "#6799c0", "#2a70a6"],
                        borderWidth: 2,
                        barPercentage: 0.9,
                        categoryPercentage: 0.6,
                    },
                ],
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
                                family: "Arial",
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
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 18,
                            },
                            color: "#666",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16, 
                            },
                            color: "#666",
                        },
                    },
                },
            },
        });
        return () => {
            if (monthlyChartInstance.current) {
                monthlyChartInstance.current.destroy();
            }
        };
    }, [monthlyData]);

    

    useEffect(() => {
        if (weeklyChartInstance.current) {
            weeklyChartInstance.current.destroy();
        }
        const ctx = weeklyChartRef.current.getContext("2d");
        weeklyChartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: weeklyLabels,
                datasets: [
                    {
                        label: "Weekly Reservations",
                        data: weeklyData,
                        backgroundColor: "#b2ccdf",
                        borderColor: "#025596",
                        borderWidth: 2,
                        fill: true,
                    },
                ],
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
                                family: "Arial",
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
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 18,
                            },
                            color: "#666",
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16, 
                            },
                            color: "#666",
                        },
                    },
                },
            },
        });
        return () => {
            if (weeklyChartInstance.current) {
                weeklyChartInstance.current.destroy();
            }
        };
    }, [weeklyData, weeklyLabels]);

    

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Reservation Analysis</h1>
                <div className="card-container-reservation">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card card-reservation">
                                    <div className="card-body card-body-reservation">
                                        <h4 className="card-title-reservation">Daily Reservations</h4>
                                        <p className="card-text-reservation">Number of reservations received through the system today</p>
                                        <div className="form-group">
                                            <label className="card-label-reservation" htmlFor="standard-reservation">{statistics.dailyReservations}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-reservation">
                                    <div className="card-body card-body-reservation">
                                        <h4 className="card-title-reservation">Weekly Reservations</h4>
                                        <p className="card-text-reservation">Number of reservations received through the system last 7 days</p>
                                        <div className="form-group">
                                            <label className="card-label-reservation" htmlFor="advanced-reservation">{statistics.weeklyReservations}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-reservation">
                                    <div className="card-body card-body-reservation">
                                        <h4 className="card-title-reservation">Monthly Reservations</h4>
                                        <p className="card-text-reservation">Number of reservations received through the system last 30 days</p>
                                        <div className="form-group">
                                            <label className="card-label-reservation" htmlFor="premium-reservation">{statistics.monthlyReservations}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-reservation">
                                    <div className="card-body card-body-reservation">
                                        <h4 className="card-title-reservation">Total Reservations</h4>
                                        <p className="card-text-reservation">Number of reservations received through the system total</p>
                                        <div className="form-group">
                                            <label className="card-label-reservation" htmlFor="premium-reservation">{statistics.totalReservations}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="chart-title m-4 text-center">Weekly Customer Reservations</h2>
                <div className="chart-reservation-div">
                    <div className="chart-container chart-reservation-1">
                        <canvas className="canvas-2" ref={weeklyChartRef}></canvas>
                    </div>
                </div>
                <h2 className="chart-title m-4 text-center">Monthly Customer Reservations</h2>
                <div className="chart-reservation-div">
                    <div className="chart-container chart-reservation-1">
                        <canvas className="canvas-1" ref={monthlyChartRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReservationAnalysis;

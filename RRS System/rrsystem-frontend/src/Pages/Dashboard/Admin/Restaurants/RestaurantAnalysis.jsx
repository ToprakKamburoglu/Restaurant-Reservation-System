import React, { useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

import Chart from "chart.js/auto";

function RestaurantAnalysis() {
    const monthlyChartRef = useRef(null);
    const monthlyChartInstance = useRef(null);
    const weeklyChartRef = useRef(null);
    const weeklyChartInstance = useRef(null);

    useEffect(() => {
        if (monthlyChartInstance.current) {
            monthlyChartInstance.current.destroy();
        }

        const ctx = monthlyChartRef.current.getContext("2d");
        monthlyChartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                    {
                        label: "Total Register",
                        data: [48, 52, 37, 43, 55, 51, 44, 33, 38, 56, 49, 50],
                        backgroundColor: [
                            "#025596",
                            "#b2ccdf",
                            "#6799c0",
                            "#2a70a6",
                        ],
                        borderColor: [
                            "#025596",
                            "#b2ccdf",
                            "#6799c0",
                            "#2a70a6",
                        ],
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
        
    }, []);

    useEffect(() => {
        if (weeklyChartInstance.current) {
            weeklyChartInstance.current.destroy();
        }

        const ctx = weeklyChartRef.current.getContext("2d");
        weeklyChartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday", "Sunday"], 
                datasets: [
                    {
                        label: "Weekly Sales",
                        data: [3, 8, 6, 5, 4, 7, 4],
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
    }, []);

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Restaurant Analysis</h1>
                <div className="card-container-restaurant">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-sm">
                                <div className="card card-restaurant">
                                    <div className="card-body card-body-restaurant">
                                        <h4 className="card-title-restaurant">Daily Register</h4>
                                        <p className="card-text-restaurant">Number of restaurants registered in the system today.</p>
                                        <div className="form-group">
                                            <label className="card-label-restaurant" htmlFor="standard-restaurant">4</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-restaurant">
                                    <div className="card-body card-body-restaurant">
                                        <h4 className="card-title-restaurant">Weekly Register</h4>
                                        <p className="card-text-restaurant">Number of restaurants registered in the system this week.</p>
                                        <div className="form-group">
                                            <label className="card-label-restaurant" htmlFor="advanced-restaurant">37</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-restaurant">
                                    <div className="card-body card-body-restaurant">
                                        <h4 className="card-title-restaurant">Monthly Register</h4>
                                        <p className="card-text-restaurant">Number of restaurants registered in the system monthly</p>
                                        <div className="form-group">
                                            <label className="card-label-restaurant" htmlFor="premium-restaurant">112</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="card card-restaurant">
                                    <div className="card-body card-body-restaurant">
                                        <h4 className="card-title-restaurant">Total Register</h4>
                                        <p className="card-text-restaurant">Number of restaurants registered in the system total.</p>
                                        <div className="form-group">
                                            <label className="card-label-restaurant" htmlFor="premium-restaurant">386</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="chart-title m-4 text-center">Weekly Restaurant Registers <i>03/02 - 09/02</i></h2>
                <div className="chart-restaurant-div">
                    <div className="chart-container chart-restaurant-1">
                        <canvas className="canvas-2" ref={weeklyChartRef}></canvas>
                    </div>
                </div>
                <h2 className="chart-title m-4 text-center">Monthly Restaurant Registers <i>2025</i></h2>
                <div className="chart-restaurant-div">
                    <div className="chart-container chart-restaurant-1">
                        <canvas className="canvas-1" ref={monthlyChartRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantAnalysis;

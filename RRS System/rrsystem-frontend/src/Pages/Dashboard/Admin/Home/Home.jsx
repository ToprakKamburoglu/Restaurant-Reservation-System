import { useEffect, useState } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import CurrencyWidget from "./CurrencyWidget.jsx";

const API_KEY = "2caae19f0db314b1a839828b";
const API_QUOTA = `https://v6.exchangerate-api.com/v6/${API_KEY}/quota`;
function Home() {
  const [userData, setUserData] = useState(null);
  const [liveUsers, setLiveUsers] = useState(0);
  const [quota, setQuota] = useState(null); 
  const [customerNumber, setCustomerNumber] = useState(0);
  const [managerNumber, setManagerNumber] = useState(0);
  const [cuisineNumber, setCuisineNumber] = useState(0);
  const [locationNumber, setLocationNumber] = useState(0);
  const { userId } = useAuth();

  const styles = `
    .live-indicator {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
      margin-right: 8px;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.2; }
      100% { opacity: 1; }
    }
  `;

  const StyleTag = () => <style>{styles}</style>;
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:8081/api/navigation-admin/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log("User Data:", data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const generateRandomUsers = () => {
      setLiveUsers(Math.floor(Math.random() * (150 - 15 + 1)) + 15);
    };

    generateRandomUsers();
    const interval = setInterval(generateRandomUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const quotaResponse = await fetch(API_QUOTA);
        if (quotaResponse.ok) {
          const data = await quotaResponse.json();
          setQuota(data.requests_remaining);
          console.log("Quota Data:", data); 
        } else {
          console.error("Error fetching quota data");
        }

        const customerResponse = await fetch("http://localhost:8081/api/admin/customers", {
          method: "GET",
          credentials: "include",
        });
        if (customerResponse.ok) {
          const customerList = await customerResponse.json();
          setCustomerNumber(customerList.length);
          console.log("Customer Data:", customerList); 
        }

        const managerResponse = await fetch("http://localhost:8081/api/admin/managers", {
          method: "GET",
          credentials: "include",
        });
        if (managerResponse.ok) {
          const managerList = await managerResponse.json();
          setManagerNumber(managerList.length);
          console.log("Manager Data:", managerList); 
        }

        const cuisineResponse = await fetch("http://localhost:8081/api/admin/cuisines", {
          method: "GET",
          credentials: "include",
        });
        if (cuisineResponse.ok) {
          const cuisineList = await cuisineResponse.json();
          setCuisineNumber(cuisineList.length);
          console.log("Cuisine Data:", cuisineList); 
        }

        const locationResponse = await fetch("http://localhost:8081/api/admin/locations", {
          method: "GET",
          credentials: "include",
        });
        if (locationResponse.ok) {
          const locationList = await locationResponse.json();
          setLocationNumber(locationList.length);
          console.log("Location Data:", locationList); 
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <StyleTag />
      <Navigation />
      <div id="content">
        <h1 className="page-name">Welcome, {userData ? `${userData.name} ${userData.surname}` : 'Loading...'}</h1>
        <CurrencyWidget />
        <div className="container mt-4">
          <div className="row">
            {/* Live Users Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="live-indicator"></span>
                    <h5 className="card-title">👥 Live Users</h5>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">Active Users</h6>
                  <p className="card-text text-danger fw-bold">
                    {liveUsers}
                  </p>
                </div>
              </div>
            </div>

            {/* Quota Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📊 Quota</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Exchange API Quota</h6>
                  <p className="card-text text-danger fw-bold">
                    {quota !== null ? `${quota} Remaining Requests` : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Number Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">👤 Customers</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Customers</h6>
                  <p className="card-text text-primary fw-bold">
                    {customerNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {/* Manager Number Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">👔 Managers</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Managers</h6>
                  <p className="card-text text-primary fw-bold">
                    {managerNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Cuisine Number Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🍴 Cuisines</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Cuisines</h6>
                  <p className="card-text text-primary fw-bold">
                    {cuisineNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Number Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📍 Locations</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Locations</h6>
                  <p className="card-text text-primary fw-bold">
                    {locationNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
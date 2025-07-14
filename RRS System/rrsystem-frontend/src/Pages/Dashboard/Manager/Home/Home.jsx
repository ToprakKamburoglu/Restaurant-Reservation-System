import { useEffect, useState } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import CurrencyWidget from "../../Admin/Home/CurrencyWidget.jsx";

const API_KEY = "2caae19f0db314b1a839828b"; 
const API_QUOTA = `https://v6.exchangerate-api.com/v6/${API_KEY}/quota`; 

function Home() {
  const [userData, setUserData] = useState(null);
  const [liveUsers, setLiveUsers] = useState(0);
  const [remainingQuota, setRemainingQuota] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [deniedRequests, setDeniedRequests] = useState(0);
  const [restaurantNumber, setRestaurantNumber] = useState(0); 
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
        const response = await fetch(`http://localhost:8081/api/navigation-manager/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log('User Data:', data);
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
          setRemainingQuota(data.requests_remaining); 
          console.log('Quota Data:', data);
        } else {
          console.error("Error fetching quota data");
          setRemainingQuota("Quota data not available");
        }

        const restaurantResponse = await fetch("http://localhost:8081/api/manager/restaurants", {
          method: "GET",
          credentials: "include",
        });
        if (restaurantResponse.ok) {
          const restaurantList = await restaurantResponse.json();
          setRestaurantNumber(restaurantList.length);
          console.log('Restaurant List:', restaurantList); 
        }

        const restaurantRequestsResponse = await fetch("http://localhost:8081/api/manager/restaurant-requests", {
          method: "GET",
          credentials: "include",
        });
        if (restaurantRequestsResponse.ok) {
          const requests = await restaurantRequestsResponse.json();
          console.log('Restaurant Requests:', requests); 

          const pendingCount = requests.filter(req => req.requestStatus === 0).length;
          const approvedCount = requests.filter(req => req.requestStatus === 1).length;
          const rejectedCount = requests.filter(req => req.requestStatus === 2).length;

          setPendingRequests(pendingCount);
          setApprovedRequests(approvedCount);
          setDeniedRequests(rejectedCount);
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
                    {remainingQuota !== null ? `${remainingQuota} Remaining Requests` : "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Approved Requests Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">✅ Approved Requests</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Approved</h6>
                  <p className="card-text text-success fw-bold">
                    {approvedRequests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {/* Pending Requests Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">⏳ Pending Requests</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Pending</h6>
                  <p className="card-text text-warning fw-bold">
                    {pendingRequests}
                  </p>
                </div>
              </div>
            </div>

            {/* Denied Requests Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">❌ Denied Requests</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Denied</h6>
                  <p className="card-text text-danger fw-bold">
                    {deniedRequests}
                  </p>
                </div>
              </div>
            </div>

            {/* Restaurant Number Card */}
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🍴 Restaurants</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Total Restaurants</h6>
                  <p className="card-text text-primary fw-bold">
                    {restaurantNumber}
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

import { useEffect, useState } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

import { useAuth } from "../../../../Routes/AuthContext.jsx";

function Home() {

    const [userData, setUserData] = useState(null);
    const { userId } = useAuth();

    useEffect(() => {
      const fetchUserData = async () => {
          if (!userId) return;
          try {
              const response = await fetch(`http://localhost:8081/api/navigation-restaurant-owner/${userId}`, {
                  method: 'GET',
                  credentials: 'include',
              });
              if (response.ok) {
                  const data = await response.json();
                  setUserData(data);
              } else {
                  console.error('Error fetching user data');
              }
          } catch (error) {
              console.error('Error:', error);
          }
        };

        fetchUserData();
    }, [userId]);

    return (
        <>
            <Navigation/>
            <div id="content">
                <h1 className="page-name">Welcome, {userData ? `${userData.name} ${userData.surname}` : 'Loading...'}</h1>
                <div className="youtube-video text-center">
                <iframe
                    src="https://www.youtube.com/embed/uJeAPVFtN08"
                    title="Rezal: Restaurant Reservation System!"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
                </div>
            </div>
        </>
                
    );
}

export default Home;
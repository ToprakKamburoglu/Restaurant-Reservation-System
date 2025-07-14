import { createBrowserRouter, Navigate } from 'react-router-dom';

// PROMOTION PAGES

import Index from '../Layouts/Promotion/Index.jsx';
import HomePromotion from "../Pages/Promotion/Home/Home.jsx";

import Pricing from "../Pages/Promotion/Pricing/Pricing.jsx";
import Contact from '../Pages/Promotion/Contact/Contact.jsx';
import Features from '../Pages/Promotion/Features/Features.jsx';

// ADMIN DASHBOARD PAGES

import HomeAdmin from "../Pages/Dashboard/Admin/Home/Home.jsx";

import ManagerList from "../Pages/Dashboard/Admin/Managers/ManagerList.jsx";
import AddManager from "../Pages/Dashboard/Admin/Managers/AddManager.jsx";

import CustomerList from "../Pages/Dashboard/Admin/Customers/CustomerList.jsx";

import EditPrices from "../Pages/Dashboard/Admin/Prices/EditPrices.jsx";

import RestaurantListAdmin from "../Pages/Dashboard/Admin/Restaurants/RestaurantList.jsx";

import CuisineList from "../Pages/Dashboard/Admin/Cuisines/CuisineList.jsx";

import LocationList from "../Pages/Dashboard/Admin/Location/LocationList.jsx";



import Revenue from "../Pages/Dashboard/Manager/Revenue/Revenue.jsx";

import UpdatePersonelInfoAdmin from "../Pages/Dashboard/Admin/UpdatePersonel/UpdatePersonel.jsx";
import ChangePasswordAdmin from '../Pages/Dashboard/Admin/ChangePassword/ChangePassword.jsx';


// MANAGER DASHBOARD PAGES

import HomeManager from "../Pages/Dashboard/Manager/Home/Home.jsx";

import RestaurantListManager from "../Pages/Dashboard/Manager/RestaurantList/RestaurantList.jsx";
import RestaurantRequests from "../Pages/Dashboard/Manager/RestaurantRequest/RestaurantRequests.jsx";
import UpdateRestaurantManager from "../Pages/Dashboard/Manager/UpdateRestaurant/UpdateRestaurant.jsx";
import ApproveRequest from '../Pages/Dashboard/Manager/RestaurantRequest/ApproveRequest.jsx';
import DenyRequest from '../Pages/Dashboard/Manager/RestaurantRequest/DenyRequest.jsx';
import UpdatePersonelInfoManager from "../Pages/Dashboard/Manager/UpdatePersonel/UpdatePersonel.jsx";
import ChangePasswordManager from '../Pages/Dashboard/Manager/ChangePassword/ChangePassword.jsx';

import Invoices from '../Pages/Dashboard/Manager/Invoices/Invoices.jsx';

// RESTAURANT OWNER DASHBOARD PAGES

import HomeRestaurantOwner from "../Pages/Dashboard/Restaurant-Owner/Home/Home.jsx";

import UpdateRestaurantOwner from "../Pages/Dashboard/Restaurant-Owner/Restaurant/UpdateRestaurant.jsx";
import TableInfo from "../Pages/Dashboard/Restaurant-Owner/Table/TableInfo.jsx";
import CreateSessions from "../Pages/Dashboard/Restaurant-Owner/Session/CreateSessions.jsx";

import CalendarViewReservations from "../Pages/Dashboard/Restaurant-Owner/Reservations/CalendarView.jsx";
import ListViewReservations from "../Pages/Dashboard/Restaurant-Owner/Reservations/ListView.jsx";
import UpdatePersonelInfoRestaurantOwner from "../Pages/Dashboard/Restaurant-Owner/UpdatePersonel/UpdatePersonel.jsx";
import YourPlan from "../Pages/Dashboard/Restaurant-Owner/YourPlan/YourPlan.jsx";
import YourApi from '../Pages/Dashboard/Restaurant-Owner/YourApi/YourApi.jsx';

import ReservationAnalysis from "../Pages/Dashboard/Restaurant-Owner/Reservations/ReservationAnalysis.jsx";

import ReserveIzaka from "../Pages/ExternalCustomer/ReserveIzaka.jsx";

import Template from  '../Layouts/Dashboard/Template.jsx';

import ExternalCustomer from "../Layouts/ExternalCustomer/ExternalTemplate.jsx";
import Tryit from '../Pages/Promotion/Tryit/Tryit.jsx';

import ChangePasswordRestaurantOwner from '../Pages/Dashboard/Restaurant-Owner/ChangePassword/ChangePassword.jsx';

// LOGIN

import Login from '../Pages/Login/Login.jsx';
import ForgotPassword from '../Pages/Login/ForgotPassword.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import Unauthorized from './Unauthorized.jsx';
import InfoRequest from '../Pages/Dashboard/Manager/RestaurantRequest/InfoRequest.jsx';
import ReserveAvarKebap from '../Pages/ExternalCustomer/ReserveAvarKebap.jsx';
import Plans from '../Pages/Dashboard/Restaurant-Owner/Payment/Plans.jsx';
import BuyQuota from '../Pages/Dashboard/Restaurant-Owner/Payment/BuyQuota.jsx';

// EMBED UI

import EmbedReservation from '../Pages/ExternalCustomer/EmbedReservation.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: "/",
                element: <HomePromotion />
            },
            {
                path: "home",
                element: <HomePromotion />
            },
            {
                path: "pricing",
                element: <Pricing />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "features",
                element: <Features />
            },
        ]
    },
    {
        path: '/index',
        element: <Index />
    },
    {
        path: "/admin",
        element: <Template />,
        children: [
            {
                path: "",
                element: <Navigate to="home" replace />
            },
            {
                path: "home",
                element: (
                    <ProtectedRoute allowedUserTypes={[1]}>
                        <HomeAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: "cuisines",
                children: [
                    {
                        path: "",
                        element: <Navigate to="cuisine-list" replace />
                    },
                    {
                        path: "cuisine-list",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <CuisineList />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: "managers",
                children: [
                    {
                        path: "",
                        element: <Navigate to="manager-list" replace />
                    },
                    {
                        path: "manager-list",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <ManagerList />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "add-manager",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <AddManager />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: "edit-prices",
                element: (
                    <ProtectedRoute allowedUserTypes={[1]}>
                        <EditPrices />
                    </ProtectedRoute>
                )
            },
            {
                path: "locations",
                children: [
                    {
                        path: "",
                        element: <Navigate to="location-list" replace />
                    },
                    {
                        path: "location-list",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <LocationList />
                            </ProtectedRoute>
                        ) 
                    }
                ]
            },
            {
                path: "reservations",
                children : [
                    {
                        path: "",
                        element: <Navigate to="reservation-analysis" replace />
                    },
                    {
                        path: "reservation-analysis",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <ReservationAnalysis />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: "restaurants",
                children: [
                    {
                        path: "",
                        element: <Navigate to="restaurant-list" replace />
                    },
                    {
                        path: "restaurant-list",
                        element: (
                            <ProtectedRoute allowedUserTypes={[1]}>
                                <RestaurantListAdmin />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: "customer-list",
                element: (
                    <ProtectedRoute allowedUserTypes={[1]}>
                        <CustomerList />
                    </ProtectedRoute>
                ) 
            },
            {
                path: "update-personel-info",
                element: (
                    <ProtectedRoute allowedUserTypes={[1]}>
                        <UpdatePersonelInfoAdmin />
                    </ProtectedRoute>
                ) 
            },
            {
                path: "change-password",
                element: (
                    <ProtectedRoute allowedUserTypes={[1]}>
                        <ChangePasswordAdmin />
                    </ProtectedRoute>
                ) 
            }
        ]
    },
    {
        path: "/manager",
        element: <Template />,
        children: [
            {
                path: "",
                element: <Navigate to="home" replace />
            },
            {
                path: "home",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <HomeManager />
                    </ProtectedRoute>
                )
            },
            {
                path: "restaurant-list",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <RestaurantListManager />
                    </ProtectedRoute>
                )
            },
            {
                path: "invoices",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <Invoices />
                    </ProtectedRoute>
                )
            },
            {
                path: "restaurant-requests",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <RestaurantRequests />
                    </ProtectedRoute>
                )
            },
            {
                path: "update-restaurant",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <UpdateRestaurantManager />
                    </ProtectedRoute>
                )
            },
            {
                path: "approve-request",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <ApproveRequest />
                    </ProtectedRoute>
                )
            },
            {
                path: "deny-request",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <DenyRequest />
                    </ProtectedRoute>
                )
            },
            {
                path: "info-request",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <InfoRequest />
                    </ProtectedRoute>
                )
            },
            {
                path: "revenue",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <Revenue />
                    </ProtectedRoute>
                ) 
            },
            {
                path: "update-personel-info",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <UpdatePersonelInfoManager />
                    </ProtectedRoute>
                ) 
            },
            {
                path: "change-password",
                element: (
                    <ProtectedRoute allowedUserTypes={[2]}>
                        <ChangePasswordManager />
                    </ProtectedRoute>
                ) 
            }
        ]
    },
    {
        path: "/restaurant-owner",
        element: <Template />,
        children: [
            {
                path: "",
                element: <Navigate to="home" replace />
            },
            {
                path: "home",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <HomeRestaurantOwner />
                    </ProtectedRoute>
                )
            },
            {
                path: "update-restaurant",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <UpdateRestaurantOwner />
                    </ProtectedRoute>
                )
            },
            {
                path: "table-info",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <TableInfo />
                    </ProtectedRoute>
                )
            },
            {
                path: "create-sessions",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <CreateSessions />
                    </ProtectedRoute>
                )
            },
            {
                path: "reservations",
                children: [
                    {
                        path: "",
                        element: <Navigate to="calendar-view" replace />
                    },
                    {
                        path: "calendar-view",
                        element: (
                            <ProtectedRoute allowedUserTypes={[3]}>
                                <CalendarViewReservations />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "list-view",
                        element: (
                            <ProtectedRoute allowedUserTypes={[3]}>
                                <ListViewReservations />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "reservation-analysis",
                        element: (
                            <ProtectedRoute allowedUserTypes={[3]}>
                                <ReservationAnalysis />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: "update-personel-info",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <UpdatePersonelInfoRestaurantOwner />
                    </ProtectedRoute>
                )
            },
            {
                path: "your-plan",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <YourPlan />
                    </ProtectedRoute>
                )
            },
            {
                path: "your-api",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <YourApi />
                    </ProtectedRoute>
                )
            },
            {
                path: "change-password",
                element: (
                    <ProtectedRoute allowedUserTypes={[3]}>
                        <ChangePasswordRestaurantOwner />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: "reserve-izaka",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <ReserveIzaka/>
            }
        ]
    },
    {
        path: "reserve-avar-kebap",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <ReserveAvarKebap/>
            }
        ]
    },
    {
        path: "reserve-avar-kebap",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <ReserveIzaka/>
            }
        ]
    },
    {
        path: "embed-reservation",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <EmbedReservation/>
            }
        ]
    },
    {   
        path: "plans",
        element: <Index />,
        children: [{
            path: "",
            element: ( 
                <ProtectedRoute allowedUserTypes={[4]}>
                    <Plans />
                </ProtectedRoute>
            )
        }]
    },
    {   
        path: "buy-quota",
        element: <Index />,
        children: [{
            path: "",
            element: ( 
                <ProtectedRoute allowedUserTypes={[5]}>
                    <BuyQuota />
                </ProtectedRoute>
            )
        }]
    },
    {
        path: "tryit",
        element: <Index />,
        children: [
            {
                path: "",
                element: <Tryit />
            }
        ]
    },
    {
        path: "login",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <Login />
            }
        ]
    },
    {
        path: "forgot-password",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <ForgotPassword />
            }
        ]
    },
    {
        path: "unauthorized",
        element: <ExternalCustomer />,
        children: [
            {
                path: "",
                element: <Unauthorized />
            }
        ]
    }
]);

export default router;
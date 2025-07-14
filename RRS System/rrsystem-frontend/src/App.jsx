import { RouterProvider, useLocation } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { AuthProvider } from "./Routes/AuthContext.jsx";

function App() {
  const location = window.location.pathname;
  const isEmbed = location.startsWith("/embed-reservation");

  if (isEmbed) {
    return <RouterProvider router={router} />;
  } else {
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  }
}

export default App;
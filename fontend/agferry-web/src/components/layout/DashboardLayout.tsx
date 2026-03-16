// import { Navigate, Outlet } from "react-router-dom";

import { Outlet } from "react-router-dom";
// import { isAuthenticated } from "@/services/authService";
const DashboardLayout = () => {

  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg">
     
        <main>
          <Outlet />
        </main>
    
    </div>
  );
};

export default DashboardLayout;

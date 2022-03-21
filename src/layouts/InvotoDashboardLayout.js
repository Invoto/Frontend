import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebars/AdminSidebar";

function InvotoDashboard(props) {
    return (
        <div>
            <AdminSidebar />
            <Outlet />
        </div>
    );
}

export default InvotoDashboard;

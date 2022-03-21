import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import TryNow from "../pages/TryNow";
import Volunteer from "../pages/Volunteer";
import APIDocs from "../pages/APIDocs";
import Accounts from "../pages/Accounts";

import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardExtraction from "../pages/dashboard/DashboardExtraction";
import DashboardVolunteer from "../pages/dashboard/DashboardVolunteer";
import DashboardDeveloper from "../pages/dashboard/DashboardDeveloper";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const routesConfig = {
    roots: {
        web: "/",
        dashboard: "/dashboard",
    }
};

const routesWeb = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about-us",
        name: "About Us",
        component: AboutUs,
    },
    {
        path: "/try-now",
        name: "Try It Now",
        component: TryNow,
    },
    {
        path: "/volunteer",
        name: "Volunteer",
        component: Volunteer,
    },
    {
        path: "/api-docs",
        name: "API Documentation",
        component: APIDocs,
    },
    {
        path: "/accounts",
        name: "Sign In/Sign Up",
        component: Accounts,
        rightAlign: 1,
    },
];

const routesDashboard = [
    {
        path: "/",
        name: "Dashboard",
        component: DashboardHome,
        icon: DashboardIcon,
    },
    {
        path: "/extraction",
        name: "Extraction",
        component: DashboardExtraction,
        icon: ReceiptIcon,
    },
    {
        path: "/volunteer",
        name: "Volunteer",
        component: DashboardVolunteer,
        icon: VolunteerActivismIcon,
    },
    {
        path: "/developer",
        name: "Developer",
        component: DashboardDeveloper,
        icon: IntegrationInstructionsIcon,
    },
];

export { routesConfig, routesWeb, routesDashboard };

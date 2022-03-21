import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import TryNow from "../pages/TryNow";
import Volunteer from "../pages/Volunteer";
import APIDocs from "../pages/APIDocs";
import Accounts from "../pages/Accounts";

import DashboardHome from "../pages/dashboard/DashboardHome";

const routesConfig = {
    roots: {
        web: "/",
        dashboard: "dashboard/",
    }
};

const routesWeb = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "about-us",
        name: "About Us",
        component: AboutUs,
    },
    {
        path: "try-now",
        name: "Try It Now",
        component: TryNow,
    },
    {
        path: "volunteer",
        name: "Volunteer",
        component: Volunteer,
    },
    {
        path: "api-docs",
        name: "API Documentation",
        component: APIDocs,
    },
    {
        path: "accounts",
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
    },
];

export { routesConfig, routesWeb, routesDashboard };

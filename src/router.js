import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { routesConfig, routesWeb, routesDashboard } from "./config/routes";
import { getRouteFromEntry } from "./utils/routes";

function InvotoRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                {/* Web Routes */}
                <Route path={routesConfig.roots.web} element={<props.layoutWeb routes={routesWeb} />}>
                    {
                        routesWeb.map((entry, key) => {
                            return getRouteFromEntry(entry, key);
                        })
                    }
                </Route>

                {/* Dashboard Routes */}
                <Route path={routesConfig.roots.dashboard} element={<props.layoutDashboard routes={routesDashboard} />}>
                    {
                        routesDashboard.map((entry, key) => {
                            return getRouteFromEntry(entry, key);
                        })
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default InvotoRouter;

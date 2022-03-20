import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import routes from "./config/routes";
import { getRouteFromEntry } from "./utils/routes";

function InvotoRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<props.layout routes={routes} />}>
                    {
                        routes.map((entry, key) => {
                            return getRouteFromEntry(entry, key)
                        })
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default InvotoRouter;

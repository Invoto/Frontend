import WebNavBar from "../components/NavBars/WebNavBar";
import { Outlet } from "react-router-dom";

function InvotoWeb(props) {
    return (
        <div>
            <WebNavBar
                routes={props.routes}
            />

            <Outlet />
        </div>
    );
}

export default InvotoWeb;

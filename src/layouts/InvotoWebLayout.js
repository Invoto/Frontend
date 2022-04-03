import WebNavBar from "../components/NavBars/WebNavBar";
import { Outlet } from "react-router-dom";

// Material Design
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import WebFooter from "../components/Footers/WebFooter";

function InvotoWeb(props) {
    return (
        <div>
            <WebNavBar
                routes={props.routes}
            />

            <Outlet />

            <WebFooter />
        </div>
    );
}

export default InvotoWeb;

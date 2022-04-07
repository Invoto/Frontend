import React from 'react';
import WebNavBar from "../components/NavBars/WebNavBar";
import { Outlet } from "react-router-dom";
import { WebNotifierProvider } from "../contexts/WebNotifier";
import WebNotifier from "../components/Notifiers/WebNotifier";

// Material Design
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import WebFooter from "../components/Footers/WebFooter";

function InvotoWeb(props) {

    const [notificationSeverity, setNotificiationSeverity] = React.useState("success");
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const showNotification = (severity, message) => {
        setNotificiationSeverity(severity);
        setNotificationMessage(message);
        setNotificationOpen(true);
    };

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationOpen(false);
        setNotificiationSeverity("success");
        setNotificationMessage("");
    };

    const contextWebNotifier = {
        showNotification: showNotification,
        closeNotification: closeNotification,
    };

    return (
        <div>
            <WebNavBar
                routes={props.routes}
            />

            <WebNotifierProvider value={contextWebNotifier}>
                <Outlet />
            </WebNotifierProvider>

            <WebNotifier notificationOpen={notificationOpen} autoHideDuration={6000} closeNotification={closeNotification} notificationSeverity={notificationSeverity} notificationMessage={notificationMessage} />

            <WebFooter />
        </div>
    );
}

export default InvotoWeb;

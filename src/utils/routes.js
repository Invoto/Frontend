import {
    Route,
} from "react-router-dom";

function getRouteFromEntry(entry, key) {
    if (entry.path == "/") {
        return (
            <Route index element={<entry.component />} key={key} />
        );
    }
    else {
        return (
            <Route
                path={entry.path.substr(1)}
                element={<entry.component />}
                key={key}
            />
        );
    }
}

export { getRouteFromEntry };

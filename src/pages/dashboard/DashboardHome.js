import React from 'react';
import DashboardContext from "../../contexts/Dashboard";

class DashboardHome extends React.Component {

    static contextType = DashboardContext;

    componentDidMount() {
        this.context.setPageTitle("Dashboard");
    }

    render() {
        return (
            <div>Erase this before creating content</div>
        );
    }

}

export default DashboardHome;

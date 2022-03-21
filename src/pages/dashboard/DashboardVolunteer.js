import React from 'react';
import DashboardContext from "../../contexts/Dashboard";

class DashboardVolunteer extends React.Component {

    static contextType = DashboardContext;

    componentDidMount() {
        this.context.setPageTitle("Volunteer");
    }

    render() {
        return (
            <div>Erase this before creating content</div>
        );
    }

}

export default DashboardVolunteer;

import React from 'react';
import DashboardContext from "../../contexts/Dashboard";

class DashboardDeveloper extends React.Component {

    static contextType = DashboardContext;

    componentDidMount() {
        this.context.setPageTitle("Developer");
    }

    render() {
        return (
            <div>Erase this before creating content</div>
        );
    }

}

export default DashboardDeveloper;

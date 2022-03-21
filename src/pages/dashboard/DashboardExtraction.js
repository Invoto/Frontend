import React from 'react';
import DashboardContext from "../../contexts/Dashboard";

class DashboardExtraction extends React.Component {

    static contextType = DashboardContext;

    componentDidMount() {
        this.context.setPageTitle("Extraction");
    }

    render() {
        return (
            <div>Erase this before creating content</div>
        );
    }

}

export default DashboardExtraction;

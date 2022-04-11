import React from "react";
import PropTypes from 'prop-types';

class TabPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children, value, index, ...other } = this.props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                className="my-4"
                {...other}
            >
                {value === index && children}
            </div>
        );
    }

}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel;

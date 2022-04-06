import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class WebNotifier extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar open={this.props.notificationOpen} autoHideDuration={this.props.autoHideDuration} onClose={this.props.closeNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={this.props.closeNotification} severity={this.props.notificationSeverity} sx={{ width: '100%' }}>
                    {this.props.notificationMessage}
                </Alert>
            </Snackbar>
        );
    }

}

export default WebNotifier;

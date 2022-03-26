import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer,
} from 'mdb-react-ui-kit';
import { isLoginFormValid, isEmailValid } from "../helpers/validators/login";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Accounts extends React.Component {

    constructor(props) {
        super(props);

        // Initialize the State for this Page.
        this.state = {
            loginRegisterActive: "login",
            notificationOpen: false,
            notificationSeverity: "success",
            notificationMessage: "",
        };

        // References
        this.loginTxtEmail = React.createRef();

        this.showNotification = this.showNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.handleLoginRegisterClick = this.handleLoginRegisterClick.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
    }

    showNotification(severity, message) {
        this.setState({
            notificationSeverity: severity,
            notificationMessage: message,
            notificationOpen: true,
        });
    }

    closeNotification(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            notificationOpen: false,
        });

        this.setState({
            notificationSeverity: "success",
            notificationMessage: "",
        });
    };

    handleLoginRegisterClick(mode) {
        this.setState({
            loginRegisterActive: mode,
        });
    }

    handleForgotPassword(e) {
        e.preventDefault();

        if (!isEmailValid(this.loginTxtEmail.current.value)) {
            this.showNotification("error", "Email not provided/Invalid email");
            return false;
        }
        else {
            // TODO: Continue Resetting with Backend.
        }
    }

    render() {
        let { loginRegisterActive, notificationOpen, notificationSeverity, notificationMessage } = this.state;

        return (
            <div className='body'>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className='d-flex justify-content-center'>
                            <div className='my-5'>
                                <MDBTabs pills justify className='mb-3'>
                                    <MDBTabsItem>
                                        <MDBTabsLink
                                            onClick={() => this.handleLoginRegisterClick('login')}
                                            active={loginRegisterActive === 'login'}
                                        >
                                            Login
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <MDBTabsLink
                                            onClick={() => this.handleLoginRegisterClick('register')}
                                            active={loginRegisterActive === 'register'}
                                        >
                                            Register
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                </MDBTabs>

                                <MDBTabsContent>
                                    <MDBTabsPane show={loginRegisterActive === 'login'}>
                                        <form>
                                            <div className='text-center mb-3'>
                                                <p>Sign in with:</p>
                                            </div>

                                            <MDBInput className='mb-4' type='email' inputRef={this.loginTxtEmail} label='Email address' />
                                            <MDBInput className='mb-4' type='password' id='form7Example2' label='Password' />

                                            <MDBRow className='mb-4'>
                                                <MDBCol className='d-flex justify-content-center'>
                                                    <a href='#' onClick={this.handleForgotPassword}>Forgot password?</a>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBBtn type='submit' className='mb-4' block>
                                                Sign in
                                            </MDBBtn>

                                            <div className='text-center'>
                                                <p>
                                                    Not a member? <a href='#' onClick={(e) => {
                                                        e.preventDefault();
                                                        this.handleLoginRegisterClick('register');
                                                    }}>Register</a>
                                                </p>
                                            </div>
                                        </form>
                                    </MDBTabsPane>
                                    <MDBTabsPane show={loginRegisterActive === 'register'}>
                                        <form>
                                            <div className='text-center mb-3'>
                                                <p>Sign up with:</p>
                                            </div>

                                            <MDBInput className='mb-4' id='form8Example1' label='Name' />
                                            <MDBInput className='mb-4' id='form8Example2' label='Username' />
                                            <MDBInput className='mb-4' type='email' id='form8Example3' label='Email address' />
                                            <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' />
                                            <MDBInput className='mb-4' type='password' id='form8Example5' label='Repeat password' />

                                            <MDBBtn type='submit' className='mb-4' block>
                                                Sign Up
                                            </MDBBtn>
                                        </form>
                                    </MDBTabsPane>
                                </MDBTabsContent>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                {/* Notification Snackbar Container */}
                <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={this.closeNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={this.closeNotification} severity={notificationSeverity} sx={{ width: '100%' }}>
                        {notificationMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }

}

export default Accounts;

import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer,
} from 'mdb-react-ui-kit';
import { isLoginFormValid, isEmailValid } from "../helpers/validators/login";
import { isRegisterFormValid } from "../helpers/validators/register";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { assessTokenValidity } from "../helpers/auth";
import { Navigate } from "react-router-dom";
const axios = require('axios').default;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Accounts extends React.Component {

    constructor(props) {
        super(props);

        // Initialize the State for this Page.
        this.state = {
            body: null,
            loginRegisterActive: "login",
            notificationOpen: false,
            notificationSeverity: "success",
            notificationMessage: "",
            token: this._getUserToken(),
        };

        // References
        this.loginTxtEmail = React.createRef();
        this.loginTxtPassword = React.createRef();
        this.registerTxtName = React.createRef();
        this.registerTxtEmail = React.createRef();
        this.registerTxtPassword = React.createRef();
        this.registerTxtPasswordRepeat = React.createRef();

        this.showNotification = this.showNotification.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.handleLoginRegisterClick = this.handleLoginRegisterClick.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    _getUserToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    _setUserToken(token) {
        localStorage.setItem("token", token);
        this.setState({
            token: token,
        });
    }

    componentDidMount() {
        const token = this._getUserToken();

        assessTokenValidity(token, () => {
            this.setState({
                token: token,
            });
        }, () => { });
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

        let vdResults = isEmailValid(this.loginTxtEmail.current.value);

        if (!vdResults[0]) {
            this.showNotification("error", vdResults[1]);
            return false;
        }
        else {
            this.showNotification("info", "Please wait...");
            const params = new URLSearchParams();
            params.append("email", this.loginTxtEmail.current.value);

            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_URL + "/auth/forgot",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params,
                validateStatus: () => true,
            }).then((res) => {
                if (res.data.status) {
                    this.closeNotification();
                    this.showNotification("success", "Successful request. Check your emails.");
                }
                else {
                    this.closeNotification();
                    this.showNotification("error", res.data.message);
                }
            }).catch((error) => {
                this.closeNotification();
                this.showNotification("error", error);
            });
        }
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        let vdResults = isLoginFormValid(
            this.loginTxtEmail.current.value,
            this.loginTxtPassword.current.value,
        );

        if (!vdResults[0]) {
            this.showNotification("error", vdResults[1]);
            return false;
        }
        else {
            this.showNotification("info", "Please wait...");

            const params = new URLSearchParams();
            params.append("email", this.loginTxtEmail.current.value);
            params.append("password", this.loginTxtPassword.current.value);

            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_URL + "/auth/login",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params,
                validateStatus: () => true,
            }).then((res) => {
                if (res.data.status) {
                    this.closeNotification();
                    this.showNotification("success", "Successful. Redirecting...");
                    setTimeout(() => {
                        this.closeNotification();
                        this._setUserToken(res.data.token);
                        this.setState({
                            body: <Navigate replace to="/dashboard" />,
                        });
                    }, 1000);
                }
                else {
                    this.closeNotification();
                    this.showNotification("error", res.data.message);
                }
            }).catch((error) => {
                this.closeNotification();
                this.showNotification("error", error);
            });
        }
    }

    handleRegisterSubmit(e) {
        e.preventDefault();

        let vdResults = isRegisterFormValid(
            this.registerTxtName.current.value,
            this.registerTxtEmail.current.value,
            this.registerTxtPassword.current.value,
            this.registerTxtPasswordRepeat.current.value,
        );

        if (!vdResults[0]) {
            this.showNotification("error", vdResults[1]);
            return false;
        }
        else {
            this.showNotification("info", "Please wait...");

            const params = new URLSearchParams();
            params.append("name", this.registerTxtName.current.value);
            params.append("email", this.registerTxtEmail.current.value);
            params.append("password", this.registerTxtPassword.current.value);
            params.append("passwordRepeat", this.registerTxtPasswordRepeat.current.value);

            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_URL + "/auth/register",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params,
                validateStatus: () => true,
            }).then((res) => {
                if (res.data.status) {
                    this.closeNotification();
                    this.showNotification("success", "Successful registration. Please login.");

                    // Resetting the text boxes in the registration form.
                    this.registerTxtName.current.value = "";
                    this.registerTxtEmail.current.value = "";
                    this.registerTxtPassword.current.value = "";
                    this.registerTxtPasswordRepeat.current.value = "";

                    // Trigger a login click to send to login form.
                    this.handleLoginRegisterClick('login');
                }
                else {
                    this.closeNotification();
                    this.showNotification("error", res.data.message);
                }
            }).catch((error) => {
                this.closeNotification();
                this.showNotification("error", error);
            });
        }
    }

    componentDidMount() {
        let { token } = this.state;

        assessTokenValidity(token).then((isTokenValid) => {
            if (isTokenValid) {
                this.setState({
                    body: <Navigate replace to="/dashboard" />,
                });
            }
        });
    }

    render() {
        let { body, loginRegisterActive, notificationOpen, notificationSeverity, notificationMessage } = this.state;

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
                                        <form onSubmit={this.handleLoginSubmit}>
                                            <div className='text-center mb-3'>
                                                <p>Sign in with:</p>
                                            </div>

                                            <MDBInput className='mb-4' type='email' inputRef={this.loginTxtEmail} label='Email address' />
                                            <MDBInput className='mb-4' type='password' inputRef={this.loginTxtPassword} label='Password' />

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
                                        <form onSubmit={this.handleRegisterSubmit}>
                                            <div className='text-center mb-3'>
                                                <p>Sign up with:</p>
                                            </div>

                                            <MDBInput className='mb-4' inputRef={this.registerTxtName} label='Name' />
                                            <MDBInput className='mb-4' type='email' inputRef={this.registerTxtEmail} label='Email Address' />
                                            <MDBInput className='mb-4' type='password' inputRef={this.registerTxtPassword} label='Password' />
                                            <MDBInput className='mb-4' type='password' inputRef={this.registerTxtPasswordRepeat} label='Repeat password' />

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

                <div>
                    {body}
                </div>
            </div>
        );
    }

}

export default Accounts;

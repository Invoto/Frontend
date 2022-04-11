import React from 'react';
import DashboardContext from "../../contexts/Dashboard";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ImageLogoInvoto from "../../assets/img/logoInvoto.png";
const axios = require('axios').default;

class DashboardHome extends React.Component {

    static contextType = DashboardContext;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };

        this.fetchUser = this.fetchUser.bind(this);
    }

    fetchUser() {
        this.context.showNotification("info", "Please wait...");

        axios({
            method: "GET",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: "/user",
            headers: {
                "Authorization": "Bearer " + this.context.userToken,
            },
            validateStatus: () => true,
        }).then((res) => {
            this.context.closeNotification();

            let resData = res.data;
            if (resData.status) {
                delete resData["status"];

                this.setState({
                    user: resData,
                });
            }
            else {
                this.context.showNotification("error", "Failed to fetch user profile.");
            }
        }).catch((error) => {
            this.context.closeNotification();
            this.context.showNotification("error", error.message);
        });
    }

    componentDidMount() {
        this.context.setPageTitle("Dashboard");

        this.fetchUser();
    }

    render() {
        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome {this.state.user && this.state.user.fullName}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Card sx={{ maxWidth: 345 }} className="my-3">
                    <CardMedia
                        component="img"
                        height="240"
                        image={ImageLogoInvoto}
                        alt="Invoto"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Invoto Unveiled!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="justify">
                            Invoto is a platform where you can automate interpreting your bills & invoices.All you have to do is just upload an image of your bill/invoice and wait for Invoto to interprete it. Invoto will extract and present all the significant information in the bill to you. Explore your dashboard!
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

}

export default DashboardHome;

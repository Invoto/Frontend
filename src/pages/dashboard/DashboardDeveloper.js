import React from 'react';
import DashboardContext from "../../contexts/Dashboard";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
const axios = require('axios').default;

class DashboardDeveloper extends React.Component {

    static contextType = DashboardContext;

    constructor(props) {
        super(props);

        this.state = {
            userAPIKeyFetchState: true,
            userAPIKey: "",
        };

        this.fetchAPIKey = this.fetchAPIKey.bind(this);
    }

    fetchAPIKey() {
        axios({
            method: "GET",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: "/user",
            headers: {
                "Authorization": "Bearer " + this.context.userToken,
            },
            validateStatus: () => true,
        }).then((res) => {
            let resData = res.data;

            if (resData.status) {
                this.setState({
                    userAPIKey: resData.DeveloperProfile.apiKey,
                });
            }
            else {
                this.context.showNotification("error", "Failure to fetch API Key.");
                this.setState({
                    userAPIKeyFetchState: false,
                });
            }
        }).catch((error) => {
            this.context.showNotification("error", error.message);
            this.setState({
                userAPIKeyFetchState: false,
            });
        });
    }

    componentDidMount() {
        this.context.setPageTitle("Developer");

        this.fetchAPIKey();
    }

    render() {
        return (
            <div>
                <Box>
                    <Paper elevation={1} className='my-2'>
                        <Typography variant="h4" className='p-4'>
                            What is this about?
                        </Typography>

                        <Typography variant="body1" className='px-4 pb-4' gutterBottom>
                            Invoto allows developers to use the API for their applications. Invoto is presented to developers in the form of a REST API where they can send requests to our endpoints and perform extractions programmatically. Your requests have to be authenticated with the API keys and you must have enough quota left in your developer plan. Happy hacking for devs!
                        </Typography>
                    </Paper>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={4}>
                            <Card sx={{ minWidth: 475 }} className='my-4'>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Your API Key
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" className='py-2'>
                                        Please keep this a secret!
                                    </Typography>

                                    <TextField
                                        value={this.state.userAPIKey}
                                        disabled={!this.state.userAPIKeyFetchState}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                        sx={{ minWidth: 425 }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }

}

export default DashboardDeveloper;

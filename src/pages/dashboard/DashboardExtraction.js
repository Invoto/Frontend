import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardContext from "../../contexts/Dashboard";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from "../../components/Tabs/TabPanel";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ExtractionProgressList from "../../components/Lists/ExtractionProgressList";
import ExtractionQuotaChart from '../../components/Charts/ExtractionQuotaChart';
import ExtractionsTable from '../../components/Tables/ExtractionsTable';
const axios = require('axios').default;

const Input = styled('input')({
    display: 'none',
});

class DashboardExtraction extends React.Component {

    static contextType = DashboardContext;

    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,

            extractUploadFile: null,

            extractionID: null,
            extractionOutputs: [],

            userConsumerProfileFetchState: true,
            userConsumerProfile: null,
            consumerExtractions: [],
        };

        this.timerExtract = null;

        this.handleExtractImageChange = this.handleExtractImageChange.bind(this);
        this.handleExtractImageSubmit = this.handleExtractImageSubmit.bind(this);
        this.handleExtractorReset = this.handleExtractorReset.bind(this);
        this.fetchConsumerProfile = this.fetchConsumerProfile.bind(this);
        this.fetchConsumerExtractions = this.fetchConsumerExtractions.bind(this);
    }

    handleExtractImageChange(event) {
        if (this.state.extractionID) {
            this.context.showNotification("error", "Already performing an extraction at the moment.");
            event.preventDefault();
            return;
        }

        this.setState({
            extractUploadFile: event.target.files[0],
        });
    }

    handleExtractImageSubmit(event) {
        if (this.state.extractionID) {
            this.context.showNotification("error", "Already performing an extraction at the moment.");
            event.preventDefault();
            return;
        }

        if (this.state.extractUploadFile) {
            this.context.showNotification("info", "Please wait...");

            const form = new FormData();
            form.append("imageFile", this.state.extractUploadFile, this.state.extractUploadFile.name);

            axios({
                method: "POST",
                baseURL: process.env.REACT_APP_BACKEND_URL,
                url: "/extractions",
                headers: {
                    "Authorization": "Bearer " + this.context.userToken,
                    "Content-Type": "multipart/form-data",
                },
                data: form,
                validateStatus: () => true,
            }).then((res) => {
                if (res.data.status) {
                    this.context.closeNotification();
                    this.context.showNotification("success", "Successfully received.");

                    this.setState({
                        extractionID: res.data.extraction_id,
                    }, () => {
                        this.timerExtract = setInterval(() => {
                            axios({
                                method: "GET",
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                url: "/extractions/" + res.data.extraction_id,
                                headers: {
                                    "Authorization": "Bearer " + this.context.userToken,
                                },
                                params: {
                                    reqOutputs: true,
                                },
                                validateStatus: () => true,
                            }).then((resExtraction) => {
                                let resExtractionData = resExtraction.data;
                                if (resExtractionData.status && resExtractionData.extractions.length > 0) {
                                    let extraction = resExtractionData.extractions[0];
                                    this.setState({
                                        extractionOutputs: extraction.outputs.reverse(),
                                    });

                                    if (extraction.jobStatus !== "QUEUED" && extraction.jobStatus !== "ONGOING") {
                                        this.setState({
                                            extractionID: null,
                                        });

                                        clearInterval(this.timerExtract);
                                    }

                                    if (extraction.jobStatus === "COMPLETED") {
                                        this.context.showNotification("success", "Extraction Completed.");
                                    }
                                    else if (extraction.jobStatus === "FAILED") {
                                        this.context.showNotification("warning", "Extraction Failed.");
                                    }
                                }
                                else {
                                    this.context.showNotification("error", "Request Failed.");
                                }
                            }).catch((error) => {
                                this.context.showNotification("error", error.message);
                            });
                        }, 1000);
                    });
                }
                else {
                    this.context.closeNotification();
                    this.context.showNotification("error", res.data.message);
                }
            }).catch((error) => {
                this.context.closeNotification();
                this.context.showNotification("error", error.message);
            });
        }
        else {
            this.context.showNotification("error", "No invoice image file selected.");
        }
    }

    handleExtractorReset(event) {
        if (this.timerExtract) {
            clearInterval(this.timerExtract);
        }

        this.setState({
            extractUploadFile: null,

            extractionID: null,
            extractionOutputs: [],
        });
    }

    fetchConsumerProfile() {
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
                    userConsumerProfile: resData.ConsumerProfile,
                });
            }
            else {
                this.context.showNotification("error", "Failure to fetch Consumer Profile.");
                this.setState({
                    userConsumerProfileFetchState: false,
                });
            }
        }).catch((error) => {
            this.context.showNotification("error", error.message);
            this.setState({
                userConsumerProfileFetchState: false,
            });
        });
    }

    fetchConsumerExtractions() {
        this.context.showNotification("info", "Please wait...");

        axios({
            method: "GET",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: "/extractions",
            headers: {
                "Authorization": "Bearer " + this.context.userToken,
            },
            params: {
                reqOutputs: true,
                usageType: "CONSUMER",
            },
            validateStatus: () => true,
        }).then((res) => {
            let resData = res.data;

            if (resData.status) {
                if (resData.extractions.length == 0) {
                    this.context.closeNotification();
                    this.context.showNotification("info", "No Extractions Found.");
                }

                this.setState({
                    consumerExtractions: resData.extractions,
                });
            }
            else {
                this.context.closeNotification();
                this.context.showNotification("error", resData.message);
            }
        }).catch((error) => {
            this.context.closeNotification();
            this.context.showNotification("error", error.message);
        });
    }

    componentDidMount() {
        this.context.setPageTitle("Extraction");

        this.fetchConsumerProfile();
        this.fetchConsumerExtractions();
    }

    render() {
        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={this.state.tabValue} onChange={(event, newTabValue) => {
                        this.setState({
                            tabValue: newTabValue,
                        });
                    }} aria-label="tabs">
                        <Tab label="Extract" />
                        <Tab label="History" />
                        <Tab label="Usage Quota" />
                    </Tabs>
                </Box>

                <TabPanel value={this.state.tabValue} index={0}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Extraction
                            </Typography>
                            <Button color="inherit" onClick={this.handleExtractorReset}>Reset</Button>
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={2} className='my-1'>
                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Upload an Image
                                    </Typography>
                                    <Typography variant="body2" className='py-2'>
                                        Please upload a scanned copy of the invoice to continue.
                                    </Typography>

                                    <label htmlFor="icon-button-file" className='mt-2'>
                                        <Input accept="image/*" id="icon-button-file" type="file" filename={this.state.extractUploadFile} onChange={this.handleExtractImageChange} />
                                        <Stack direction="row" spacing={2}>
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>

                                            {
                                                !this.state.extractUploadFile ?
                                                    <Chip label="No File Selected" color="error" className='my-1' />
                                                    :
                                                    <Chip label={this.state.extractUploadFile.name} color="success" className='my-1' />
                                            }
                                        </Stack>
                                    </label>

                                    <Stack spacing={2}>
                                        {
                                            this.state.extractUploadFile ?
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 500,
                                                        width: 300,
                                                        maxHeight: { xs: 200, md: 500 },
                                                        maxWidth: { xs: 100, md: 300 },
                                                    }}
                                                    className='mt-3'
                                                    src={URL.createObjectURL(this.state.extractUploadFile)}
                                                />
                                                :
                                                <div></div>
                                        }
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={this.handleExtractImageSubmit}>Submit</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Results
                                    </Typography>
                                    <Typography variant="body2" className='py-2'>
                                        Submit an image of an invoice to start processing.
                                    </Typography>

                                    {
                                        !this.state.extractionID && this.state.extractionOutputs.length == 0 ?
                                            <Box sx={{ display: 'flex' }} className='my-3'>
                                                <Stack direction="row" spacing={2}>
                                                    <CircularProgress />
                                                    <Typography variant="body2" className='py-2'>
                                                        Waiting for an Image...
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                            :
                                            <div></div>
                                    }

                                    <ExtractionProgressList sx={{ mt: 1 }} itemsList={this.state.extractionOutputs} className='my-3' />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={this.state.tabValue} index={1}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Extraction History
                            </Typography>
                            <Button color="inherit" onClick={this.fetchConsumerExtractions}>Refresh</Button>
                        </Toolbar>
                    </AppBar>

                    <ExtractionsTable extractions={this.state.consumerExtractions} rowsPerPage={10} />
                </TabPanel>

                <TabPanel value={this.state.tabValue} index={2}>
                    <ExtractionQuotaChart extractionProfile={this.state.userConsumerProfile} />
                </TabPanel>
            </Box>
        );
    }

}

export default DashboardExtraction;

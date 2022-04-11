import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardContext from "../../contexts/Dashboard";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from "../../components/Tabs/TabPanel";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Chip from '@mui/material/Chip';
import VolunteerUploadDialog from '../../components/Dialogs/VolunteerUploadDialog';
import Link from '@mui/material/Link';
import VolunteeredImageList from "../../components/Lists/VolunteeredImageList";
const axios = require('axios').default;

const Input = styled('input')({
    display: 'none',
});

class DashboardVolunteer extends React.Component {

    static contextType = DashboardContext;

    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,

            volunteerUploadFile: null,

            isUploadDialogOpen: false,
            uploadDialogUploadingState: null,
            uploadDialogStatusTitle: "",
            uploadDialogStatusDesc: "",

            volunteeredDocuments: [],
        };

        this.handleUploadDialogClose = this.handleUploadDialogClose.bind(this);
        this.handleVolunteerImageChange = this.handleVolunteerImageChange.bind(this);
        this.handleVolunteerImageSubmit = this.handleVolunteerImageSubmit.bind(this);
        this.fetchVolunteeredDocuments = this.fetchVolunteeredDocuments.bind(this);
    }

    handleUploadDialogClose() {
        this.setState({
            volunteerUploadFile: null, // Since at anytime the dialog is closed, it marks an end of an upload.

            isUploadDialogOpen: false,
            uploadDialogUploadingState: null,
            uploadDialogStatusTitle: "",
            uploadDialogStatusDesc: "",
        });
    }

    handleVolunteerImageChange(event) {
        this.setState({
            volunteerUploadFile: event.target.files[0],
        });
    }

    handleVolunteerImageSubmit(event) {
        if (this.state.volunteerUploadFile) {
            this.setState({
                uploadDialogUploadingState: "uploading",
                uploadDialogStatusTitle: "Uploading",
                uploadDialogStatusDesc: "Creating Request...",
                isUploadDialogOpen: true,
            }, () => {
                const form = new FormData();
                form.append("imageFile", this.state.volunteerUploadFile, this.state.volunteerUploadFile.name);

                axios({
                    method: "POST",
                    baseURL: process.env.REACT_APP_BACKEND_URL,
                    url: "/volunteer",
                    headers: {
                        "Authorization": "Bearer " + this.context.userToken,
                        "Content-Type": "multipart/form-data",
                    },
                    data: form,
                    validateStatus: () => true,
                }).then((resVol) => {
                    let resVolData = resVol.data;
                    if (resVolData.status) {
                        this.setState({
                            uploadDialogUploadingState: "success",
                            uploadDialogStatusTitle: "Upload Successful",
                            uploadDialogStatusDesc: (
                                <span>
                                    <Link href={resVolData.imageURL} underline="always" target="_blank">
                                        Click here
                                    </Link>
                                    to view the uploaded image
                                </span>
                            ),
                        });

                        this.fetchVolunteeredDocuments();
                    }
                    else {
                        this.setState({
                            uploadDialogUploadingState: "failed",
                            uploadDialogStatusTitle: "Upload Failed",
                            uploadDialogStatusDesc: (
                                <span>
                                    {resVolData.message}
                                </span>
                            ),
                        });
                    }
                }).catch((error) => {
                    this.setState({
                        uploadDialogUploadingState: "failed",
                        uploadDialogStatusTitle: "Upload Failed",
                        uploadDialogStatusDesc: (
                            <span>
                                {error.message}
                            </span>
                        ),
                    });
                });
            });
        }
        else {
            this.context.showNotification("error", "Please select an appropriate image.");
        }
    }

    fetchVolunteeredDocuments() {
        this.context.showNotification("info", "Please wait...");

        axios({
            method: "GET",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: "/volunteer",
            headers: {
                "Authorization": "Bearer " + this.context.userToken,
            },
            validateStatus: () => true,
        }).then((res) => {
            this.context.closeNotification();

            let resData = res.data;
            if (resData.status) {
                if (resData.volunteeredDocuments.length == 0) {
                    this.context.showNotification("info", "No Volunteered Documents Found.");
                }

                this.setState({
                    volunteeredDocuments: resData.volunteeredDocuments,
                });
            }
            else {
                this.context.showNotification("error", resData.message);
            }
        }).catch((error) => {
            this.context.closeNotification();
            this.context.showNotification("error", error.message);
        });
    }

    componentDidMount() {
        this.context.setPageTitle("Volunteer");

        this.fetchVolunteeredDocuments();
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
                        <Tab label="Volunteer" />
                        <Tab label="History" />
                    </Tabs>
                </Box>

                <TabPanel value={this.state.tabValue} index={0}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Submit an Invoice
                            </Typography>
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
                                        <Input accept="image/*" id="icon-button-file" type="file" filename={this.state.volunteerUploadFile} onChange={this.handleVolunteerImageChange} />
                                        <Stack direction="row" spacing={2}>
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>

                                            {
                                                !this.state.volunteerUploadFile ?
                                                    <Chip label="No File Selected" color="error" className='my-1' />
                                                    :
                                                    <Chip label={this.state.volunteerUploadFile.name} color="success" className='my-1' />
                                            }
                                        </Stack>
                                    </label>

                                    <Stack spacing={2}>
                                        {
                                            this.state.volunteerUploadFile ?
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 500,
                                                        width: 300,
                                                        maxHeight: { xs: 200, md: 500 },
                                                        maxWidth: { xs: 100, md: 300 },
                                                    }}
                                                    className='mt-3'
                                                    src={URL.createObjectURL(this.state.volunteerUploadFile)}
                                                />
                                                :
                                                <div></div>
                                        }
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={this.handleVolunteerImageSubmit}>Upload</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                    <VolunteerUploadDialog open={this.state.isUploadDialogOpen} close={this.handleUploadDialogClose} uploadingState={this.state.uploadDialogUploadingState} statusTitle={this.state.uploadDialogStatusTitle} statusDesc={this.state.uploadDialogStatusDesc} />
                </TabPanel>

                <TabPanel value={this.state.tabValue} index={1}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                The Images you Volunteered...
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ width: '100%' }}>
                        <VolunteeredImageList vdocs={this.state.volunteeredDocuments} />
                    </Box>
                </TabPanel>
            </Box>
        );
    }

}

export default DashboardVolunteer;

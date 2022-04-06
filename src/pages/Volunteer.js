import React from 'react';
import WebNotifierContext from '../contexts/WebNotifier';
import {
    MDBContainer, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText,
    MDBFile, MDBBtn,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import VolunteerUploadDialog from '../components/Dialogs/VolunteerUploadDialog';
import Link from '@mui/material/Link';

import "../assets/css/pages/volunteer.css";

class Volunteer extends React.Component {

    static contextType = WebNotifierContext;

    constructor(props) {
        super(props);

        // Defining the state for this component.
        this.state = {
            volFileImage: null,
            volFile: null,

            isUploadDialogOpen: false,
            uploadDialogUploadingState: null,
            uploadDialogStatusTitle: "",
            uploadDialogStatusDesc: "",
        };

        this.divVolImgRender = React.createRef();

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.handleUploadDialogClose = this.handleUploadDialogClose.bind(this);
    }

    _addStylesToVolRenderImage() {
        let divImgRender = this.divVolImgRender.current;
        divImgRender.style.display = "block";
        if (!divImgRender.classList.contains("mt-4")) {
            divImgRender.classList.add("mt-4");
        }
    }

    handleImageChange(e) {
        this.setState({
            volFile: e.target.files[0],
            volFileImage: URL.createObjectURL(e.target.files[0]),
        });

        this._addStylesToVolRenderImage();
    }

    handleImageSubmit(e) {
        if (this.state.volFile) {
            this.setState({
                uploadDialogUploadingState: "uploading",
                uploadDialogStatusTitle: "Uploading",
                uploadDialogStatusDesc: "Creating Request...",
                isUploadDialogOpen: true,
            }, () => {
                const form = new FormData();
                form.append("imageFile", this.state.volFile, this.state.volFile.name);

                axios({
                    method: "POST",
                    baseURL: process.env.REACT_APP_BACKEND_URL,
                    url: "/public/volunteer",
                    headers: {
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

    handleUploadDialogClose() {
        this.setState({
            isUploadDialogOpen: false,
            uploadDialogUploadingState: null,
            uploadDialogStatusTitle: "",
            uploadDialogStatusDesc: "",
        });
    }

    render() {
        return (
            <div className='body'>
                {/* Cover Image Content */}
                <div className='p-5 text-center bg-image volunteer-cover'>
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-white'>
                                <h1 className='mb-3 fw-bold'>Volunteer</h1>
                                <h5 className='mb-4'>Contribute to make the world a better place</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <MDBContainer className='volunteer-container'>
                    {/* Volunteering Description Section */}
                    <MDBRow>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle className='mt-1 mb-3'><h2 className='text-center fw-bold'>What is Volunteering?</h2></MDBCardTitle>
                                <MDBCardText>
                                    <p className='fs-5 volunteer-desc'>
                                        Invoto depends on a deep learning model that we've crafted using thousands of image files of invoices. Although this provides the best performance it could at the moment, you can contribute to make it even better. How? You can provide us with the scanned copies of invoices that you have as images and we will use them to enhance our model regularly. All you have to do is capture a clear 'document-type' photo of your invoice or scan it using a standard document scanner and upload it below. That's it. Not much of a hustle huh?
                                    </p>
                                </MDBCardText>
                                <MDBCardText>
                                    <p className='fs-5 volunteer-desc'>
                                        Furthermore, if you are interested in contributing regularly, you can <a href='accounts'>create an account</a> with us.
                                    </p>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBRow>

                    {/* Upload Section */}
                    <MDBRow className='mt-4'>
                        <MDBCol md='12' className='d-flex justify-content-center'>
                            <MDBCard color='primary'>
                                <MDBCardBody>
                                    <MDBCardTitle><h2 className='text-center fw-bold'>Upload Invoice Image - Contribution</h2></MDBCardTitle>
                                    <MDBCardSubTitle className='pt-3'>Please upload a scanned image of any invoice to contribute.</MDBCardSubTitle>

                                    <MDBCol md='5'>
                                        <div className='file-container mt-3'>
                                            <MDBFile label='Choose Invoice Image File' id='formVolFileImage' accept='image/*' onChange={this.handleImageChange} />
                                        </div>

                                        <div ref={this.divVolImgRender} className='render-vol-image'>
                                            <img src={this.state.volFileImage} />
                                        </div>

                                        {
                                            this.state.volFileImage ?
                                                <div>
                                                    <MDBBtn className='mt-4' onClick={this.handleImageSubmit}>Submit</MDBBtn>
                                                </div>
                                                :
                                                <div></div>
                                        }
                                    </MDBCol>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                {/* Upload Dialog Content */}
                <VolunteerUploadDialog open={this.state.isUploadDialogOpen} close={this.handleUploadDialogClose} uploadingState={this.state.uploadDialogUploadingState} statusTitle={this.state.uploadDialogStatusTitle} statusDesc={this.state.uploadDialogStatusDesc} />
            </div>
        );
    }

}

export default Volunteer;

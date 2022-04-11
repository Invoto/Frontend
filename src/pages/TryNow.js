import React from 'react';
import {
    MDBContainer, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText,
    MDBFile, MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';
import WebNotifierContext from '../contexts/WebNotifier';
import axios from 'axios';
import ExtractionProgressList from "../components/Lists/ExtractionProgressList";

import '../assets/css/pages/trynow.css';

class TryNow extends React.Component {

    static contextType = WebNotifierContext;

    constructor(props) {
        super(props);

        // Defining the state for this component.
        this.state = {
            tryFileImage: null,
            tryImage: null,

            extractionID: null,
            extractionOutputs: [],
        };

        this.divImgRender = React.createRef();
        this.divImgWaiter = React.createRef();

        this.timerTryNow = null;

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
    }

    _addStylesToRenderImage() {
        let divImgRender = this.divImgRender.current;
        divImgRender.style.display = "block";
        if (!divImgRender.classList.contains("mt-4")) {
            divImgRender.classList.add("mt-4");
        }
    }

    handleImageChange(e) {
        this.setState({
            tryFileImage: e.target.files[0],
            tryImage: URL.createObjectURL(e.target.files[0]),
        });

        this._addStylesToRenderImage();
    }

    handleImageSubmit(e) {
        if (this.state.tryFileImage) {
            this.context.showNotification("info", "Please wait...");

            const form = new FormData();
            form.append("imageFile", this.state.tryFileImage, this.state.tryFileImage.name);

            axios({
                method: "POST",
                baseURL: process.env.REACT_APP_BACKEND_URL,
                url: "/public/try",
                headers: {
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
                        this.timerTryNow = setInterval(() => {
                            axios({
                                method: "GET",
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                url: "/try-monitor/" + res.data.extraction_id,
                                params: {
                                    reqOutputs: true,
                                },
                                validateStatus: () => true,
                            }).then((resExtraction) => {
                                let resExtractionData = resExtraction.data;
                                if (resExtractionData.status && resExtractionData.extractions.length > 0) {
                                    let extraction = resExtractionData.extractions[0];
                                    this.setState({
                                        extractionOutputs: extraction.outputs,
                                    });

                                    if (extraction.jobStatus !== "QUEUED" && extraction.jobStatus !== "ONGOING") {
                                        clearInterval(this.timerTryNow);
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
            }).catch((err) => {
                this.context.closeNotification();
                this.context.showNotification("error", err.message);
            });
        }
        else {
            this.context.showNotification("error", "Please select an appropriate image.");
        }
    }

    render() {
        return (
            <div className="body">
                {/* Header Section */}
                <div className='p-5 text-center bg-dark' >
                    <h1 className='text-light mb-3'>Invoto - Try it Now</h1>
                    <h4 className='text-light mb-3'>Invoto Free Web Demonstration</h4>
                    <p className='text-light'>
                        Try out our services with an image of any bill/invoice of yours.
                    </p>
                </div>

                {/* Contents */}
                <MDBContainer className='trynow-container'>
                    <MDBRow>
                        <MDBCol md='6'>
                            <MDBCard color='primary'>
                                <MDBCardBody className='output-body overflow-auto'>
                                    <MDBCardTitle tag="h2">Upload Invoice Image</MDBCardTitle>
                                    <MDBCardSubTitle className='pt-3'>Please upload a scanned image of any invoice.</MDBCardSubTitle>

                                    <div className='file-container mt-3'>
                                        <MDBFile label='Choose Invoice Image File' id='formTryFileImage' accept='image/*' onChange={this.handleImageChange} />
                                    </div>

                                    <div ref={this.divImgRender} className='render-image'>
                                        <img src={this.state.tryImage} />
                                    </div>

                                    {
                                        this.state.tryFileImage ?
                                            <div>
                                                <MDBBtn className='mt-4' onClick={this.handleImageSubmit}>Submit</MDBBtn>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCard color='primary'>
                                <MDBCardBody className='output-body overflow-auto'>
                                    <MDBCardTitle tag="h2">Results</MDBCardTitle>
                                    <MDBCardText>Submit an image of an invoice to start processing.</MDBCardText>

                                    {
                                        !this.state.extractionID ?
                                            <div ref={this.divImgWaiter} className='d-flex align-items-center'>
                                                <MDBSpinner grow className='float-start me-4'>
                                                    <span className='visually-hidden'>Loading...</span>
                                                </MDBSpinner>
                                                <MDBCardText>Waiting for an Image...</MDBCardText>
                                            </div>
                                            :
                                            <div></div>
                                    }

                                    <ExtractionProgressList sx={{ mt: 1 }} itemsList={this.state.extractionOutputs} />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}

export default TryNow;

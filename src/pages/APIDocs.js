import React from 'react';
import "../assets/css/pages/apidocs.css";
import {
    MDBContainer, MDBRow, MDBCol,
    MDBTypography,
    MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText,
    MDBIcon,
    MDBInput, MDBBtn,
} from "mdb-react-ui-kit";

class APIDocs extends React.Component {

    render() {
        return (
            <div className='body text-light bg-dark'>
                {/* Cover Image Section */}
                <div className='p-5 text-center bg-image intro-content'>
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-white'>
                                <h1 className='mb-3 fw-bold'>API Documentation</h1>
                                <h5 className='mb-4'>Build by developers for developers</h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content of the Page */}
                <MDBContainer className="mt-5">
                    <MDBRow>
                        <MDBCol size="md-8">
                            <MDBTypography tag='h5' className='fw-bold'>API Reference</MDBTypography>
                            <p className='pt-4'>
                                The Invoto API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
                            </p>

                            <p className='pt-1 text-muted'>
                                You can use the Invoto API in test mode, which does not affect your live data or interact with the account quotas. The API key you use to authenticate the request determines whether the request is live mode or test mode.
                                The Invoto API differs for every account as we release new versions and tailor functionality. Log in to see docs customized to your version of the API, with your test key and data.
                            </p>
                        </MDBCol>

                        <MDBCol size="md-4 mt-5">
                            <MDBTypography tag='h6' className='fw-bold text-uppercase'>Just Getting Started?</MDBTypography>
                            <p className='pt-1'>
                                Check out our development quickstart guide.
                            </p>

                            <MDBTypography tag='h6' className='pt-3 fw-bold text-uppercase'>Not a Developer?</MDBTypography>
                            <p className='pt-1'>
                                Login/Register to get started with Invoto and to do more with your Invoto account—no code required.
                            </p>

                            <MDBCard className='text-dark mt-4' alignment='left'>
                                <MDBCardHeader className='text-start px-3 py-2 text-uppercase'>Base URL</MDBCardHeader>
                                <MDBCardBody className='m-0 p-0'>
                                    <MDBCardText className='px-3 py-2'>{process.env.REACT_APP_BACKEND_URL}/api</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <span className="square my-5 border-bottom border-1"></span>
                    </MDBRow>

                    <MDBRow className='pb-5'>
                        <MDBCol size="md-8">
                            <MDBTypography tag='h5' className='fw-bold'>Extraction</MDBTypography>
                            <p className='pt-4'>
                                Once you obtain API keys from your account, you can simply use that for authentication to perform extractions using our API. Invoto uses API keys to authenticate requests. You can manage or view your API keys in your dashboard.
                            </p>

                            <p className='pt-1 text-muted'>
                                Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
                            </p>
                        </MDBCol>

                        <MDBCol size="md-4 mt-4">
                            <MDBCard className='text-dark mt-4' alignment='left'>
                                <MDBCardHeader className='text-start px-3 py-2 text-uppercase'>Extraction Request</MDBCardHeader>
                                <MDBCardBody className='m-0 p-0'>
                                    <MDBCardText className='px-3 py-2'>
                                        $ curl {process.env.REACT_APP_BACKEND_URL}/api/extract \<br />
                                        --header 'Authorization: Bearer [YOUR_API_KEY]' \<br />
                                        --header 'Content-Type: multipart/form-data; boundary=---------BOUNDARY' \<br />
                                        -X POST  \<br />
                                        --data-binary @file
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}

export default APIDocs;

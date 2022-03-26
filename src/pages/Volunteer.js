import React from 'react';
import {
    MDBContainer, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBCardLink,
    MDBFile, MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';

import "../assets/css/pages/volunteer.css";

class Volunteer extends React.Component {

    constructor(props) {
        super(props);

        // Defining the state for this component.
        this.state = {
            volFileImage: null,
        };

        this.divVolImgRender = React.createRef();

        this.handleImageChange = this.handleImageChange.bind(this);
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
            volFileImage: URL.createObjectURL(e.target.files[0])
        });

        this._addStylesToVolRenderImage();
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
                                    <p className='fs-5'>
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
                                                    <MDBBtn className='mt-4'>Submit</MDBBtn>
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
            </div>
        );
    }

}

export default Volunteer;

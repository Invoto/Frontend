import React from 'react';
import {
    MDBContainer, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBCardLink,
    MDBFile, MDBBtn
} from 'mdb-react-ui-kit';

import '../assets/css/pages/trynow.css';

class TryNow extends React.Component {

    constructor(props) {
        super(props);

        // Defining the state for this component.
        this.state = {
            tryFileImage: null,
        };

        this.divImgRender = React.createRef();

        this.handleImageChange = this.handleImageChange.bind(this);
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
            tryFileImage: URL.createObjectURL(e.target.files[0])
        });

        this._addStylesToRenderImage();
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
                <MDBContainer className='container'>
                    <MDBRow>
                        <MDBCol md='6'>
                            <MDBCard color='primary'>
                                <MDBCardBody>
                                    <MDBCardTitle><h2>Upload Invoice Image</h2></MDBCardTitle>
                                    <MDBCardSubTitle className='pt-3'>Please upload a scanned image of any invoice.</MDBCardSubTitle>

                                    <div className='file-container mt-3'>
                                        <MDBFile label='Choose Invoice Image File' id='formTryFileImage' accept='image/*' onChange={this.handleImageChange} />
                                    </div>

                                    <div ref={this.divImgRender} className='render-image'>
                                        <img src={this.state.tryFileImage} />
                                    </div>

                                    {
                                        this.state.tryFileImage ?
                                            <div>
                                                <MDBBtn className='mt-4'>Submit</MDBBtn>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md='6'>
                            <MDBCard color='primary'>
                                <MDBCardBody>
                                    <MDBCardTitle><h2>Results</h2></MDBCardTitle>
                                    <MDBCardText>Submit an image of an invoice to start processing.</MDBCardText>

                                    <div id='frmTryNowOutputs' className='outputs'></div>
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

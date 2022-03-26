import React from "react";
import {
  MDBContainer, MDBRow, MDBCol,
  MDBCard, MDBCardHeader, MDBCardOverlay, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink,
  MDBIcon,
  MDBInput, MDBCheckbox, MDBBtn,
} from "mdb-react-ui-kit";
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../assets/css/pages/aboutus.css";
import ImageChandeepa from "../assets/img/chandeepa.jpg";
import ImageHirushani from "../assets/img/hirushani.jpg";
import ImageGimhani from "../assets/img/gimhani.jpg";
import ImageSubscribeRight from "../assets/img/aboutus-subscribe-right.png";

class AboutUs extends React.Component {

  render() {
    return (
      <div className="body">
        {/* Cover Image Section */}
        <div className='p-5 text-center bg-image intro-content'>
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <h1 className='mb-3 fw-bold'>About Us</h1>
                <h5 className='mb-4'>Working with an Amazing Team</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Content of the Page */}
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol size="md-8">
              <p className="description fs-4">
                We are a group of Junior Undergraduates affiliated to Department of Statistics and Computer Science at University of Kelaniya. Invoto was initially undertaken as the group project for a course module and developed into a fully fledged product. We excel at AI and Web Technologies and we strive to bring different ecosystems to life. We created Invoto to facilitate buying-selling processes in the local, Sri Lankan context. We are based in Colombo, Sri Lanka.
              </p>
            </MDBCol>

            <MDBCol size="md-4">
              <MDBCard shadow='0' border='dark' background='white' className="mx-3">
                <MDBCardHeader><h3 className="py-2">Expertise of the Team</h3></MDBCardHeader>
                <MDBCardBody className='text-dark'>
                  <div className="expertise-list">
                    <ul>
                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="React"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Express"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="FastAPI"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Sequelize ORM"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="HTML"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="CSS"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="ES6"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Deep Learning"
                        />
                      </li>

                      <li className="m-1">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Python"
                        />
                      </li>
                    </ul>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol size="md-12">
              <h2 className="text-center py-3">Our Team</h2>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mt-3">
            <MDBCol size="md-4" className="col-example">
              <div>
                <img src={ImageChandeepa} alt="chandeepa" className="team-image" />
                <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/chandeepadissanayake" target="_blank">
                  <MDBIcon className="me-2" fab icon="github" /> Chandeepa Dissanayake
                </MDBBtn>
              </div>
            </MDBCol>

            <MDBCol size="md-4" className="col-example">
              <div>
                <img src={ImageGimhani} alt="gimhani" className="team-image" />
                <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/gimhanimadhu" target="_blank">
                  <MDBIcon className="me-2" fab icon="github" /> Gimhani Madusha
                </MDBBtn>
              </div>
            </MDBCol>

            <MDBCol size="md-4" className="col-example">
              <div>
                <img src={ImageHirushani} alt="hirushani" className="team-image" />
                <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/Umayanga98" target="_blank">
                  <MDBIcon className="me-2" fab icon="github" /> Hirushani Umayanga
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mt-5">
            <MDBCol size="md-7">
              <MDBCard shadow='0' border='light' background='white' className='mb-3'>
                <MDBCardHeader><MDBCardTitle className="fw-bold">Be the first to see our newsletter</MDBCardTitle></MDBCardHeader>
                <MDBCardBody>
                  <MDBCardText>
                    Your company may not be in the software business, but eventually, a software company will be in your business.
                  </MDBCardText>

                  <form>
                    <div className="w-75 pt-3">
                      <MDBInput className='mb-4 w-75' type='frmSubscribeTxtEmail' id='form5Example2' label='Email Address' />
                    </div>

                    <div className="w-25">
                      <MDBBtn type='submit'>
                        Subscribe
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol size="md-5">
              <img src={ImageSubscribeRight} className='img-fluid' alt='...' />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default AboutUs;

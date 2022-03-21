import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "../assets/css/pages/aboutus.css";
import chandeepa from "../assets/img/chandeepa.jpg";
import hirushani from "../assets/img/hirushani.jpg";
import gimhani from "../assets/img/gimhani.jpg";

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <div className="intro-content">
          <>
            <MDBContainer>
              <div className="heading p-4">
                <h1>About Us</h1>
              </div>
            </MDBContainer>

            <MDBContainer breakpoint="sm">
              <p className="description">
                In Sri Lanka, shopper can't recognize different parts of the
                bill by point out their mobile device at the bill. With Invoto,
                we intend to develop a community-driven web application where
                the application itself would allow a user to get their bills
                labelled and extract relevant information such as total amount
                etc. automatically. Anyone can contribute as volunteers to
                enhance the models used for data extraction by uploading the
                images of the bills they find or receive and labelling the
                important segments. This will be extremely helpful for different
                business organizations and companies with their finance
                management, inventory tracking, automation of loyalty, rewards,
                and cash back programs and at the simplest case of splitting the
                restaurant bill between a group of people and calculating the
                tip. In a local context, Invoto will assist local businesses in
                different aspects of automation of tasks such as bill payments.
              </p>
              <br />
            </MDBContainer>
          </>
        </div>

        <MDBContainer breakpoint="md">
          <h4 className="team-title p-4">Our Team</h4>
          <MDBContainer>
            <MDBRow>
              <MDBCol size="md-4" className="col-example">
                <div>
                  <img src={chandeepa} alt="chandeepa" className="team-image" />
                  <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/chandeepadissanayake" target="_blank">
                    <MDBIcon className="me-2" fab icon="github" /> Chandeepa Dissanayake
                  </MDBBtn>
                </div>
              </MDBCol>

              <MDBCol size="md-4" className="col-example">
                <div>
                  <img src={gimhani} alt="gimhani" className="team-image" />
                  <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/gimhanimadhu" target="_blank">
                    <MDBIcon className="me-2" fab icon="github" /> Gimhani Madusha
                  </MDBBtn>
                </div>
              </MDBCol>

              <MDBCol size="md-4" className="col-example">
                <div>
                  <img src={hirushani} alt="hirushani" className="team-image" />
                  <MDBBtn style={{ backgroundColor: "black" }} className="m-3" href="https://github.com/Umayanga98" target="_blank">
                    <MDBIcon className="me-2" fab icon="github" /> Hirushani Umayanga
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </div>
    );
  }
}

export default AboutUs;

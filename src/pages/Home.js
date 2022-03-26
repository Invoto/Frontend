import React from 'react';
import {
  MDBContainer, MDBCol, MDBRow,
  MDBTypography,
  MDBInput, MDBCheckbox, MDBBtn,
  MDBCard, MDBCardHeader, MDBCardOverlay, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink,
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement, MDBCarouselCaption,
  MDBBadge,
} from 'mdb-react-ui-kit';
import ImageLogoSplash from '../assets/img/homebg.png';
import ImageInvoiceCover from '../assets/img/home-invoice-cover.jpg';
import ImageSupportCover from '../assets/img/home-what-support-cover.jpg';
import ImagePortfolioInvoice1 from '../assets/img/home-portfolio-invoice-1.jpg';
import ImagePortfolioAPI2 from '../assets/img/home-portfolio-api-2.jpg';
import ImagePortfolioDL3 from '../assets/img/home-portfolio-dl-3.jpg';
import ImagePortfolioVol4 from '../assets/img/home-portfolio-vol-4.jpg';
import ImageDev from '../assets/img/home-dev.jpg';

import "../assets/css/pages/home.css";

class Home extends React.Component {

  render() {
    return (
      <div className='home-body'>
        <header>
          <div
            id='homebg'
            className='cover p-5 text-center bg-image'
          >
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white'>
                  <h1 className='title mb-3'>INVOTO</h1>
                  <div className='home-description'>
                    <h5 className='mb-3'>WHERE AI MEETS BILLS</h5>
                    <p>Invoto provides you an agent that interpretes your bills, for you.</p>
                  </div>
                  <a
                    className='btn btn-outline-light btn-lg m-2'
                    href='about-us'
                    role='button'
                    rel='nofollow'
                  >
                    ABOUT US
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <>
          <div className='bg-dark m-0'>
            {/* Top Level Statistics Section */}
            <div className="d-flex w-75 mx-auto text-center py-3 px-2" style={{ height: "auto" }}>
              <MDBRow>
                <MDBCol md='4'>
                  <MDBTypography variant='h3' className='text-primary'>1000+</MDBTypography>
                  <MDBTypography variant='h4' className='text-light'>Training Images</MDBTypography>
                  <MDBTypography className='lead mb-0 text-white-50 text-center fs-6'>
                    Our deep learning models were trained on datasets of more than 1000 high quality images and they were subjected to optimum preprocessing for state-of-the art performance with best deep learning models.
                  </MDBTypography>
                </MDBCol>
                <MDBCol md='4'>
                  <MDBTypography variant='h3' className='text-primary'>100+</MDBTypography>
                  <MDBTypography variant='h4' className='text-light'>Daily Users</MDBTypography>
                  <MDBTypography className='lead mb-0 text-white-50 text-center fs-6'>
                    More than 100 members actively use our services on a daily basis. We thrive to provide the best service & assure 99.99% uptime guarantee.
                  </MDBTypography>
                </MDBCol>
                <MDBCol md='4'>
                  <MDBTypography variant='h3' className='text-primary'>5000+</MDBTypography>
                  <MDBTypography variant='h4' className='text-light'>Weekly API Calls</MDBTypography>
                  <MDBTypography className='lead mb-0 text-white-50 text-center fs-6'>
                    We are really popular among developers. We receive more than 5000 API calls weekly. We accept bulk processing requests too. We offer the most flexible pricing plan for developers.
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
            </div>

            {/* Introduction Section */}
            <div className="d-flex w-75 mx-auto py-3 px-2" style={{ height: "auto" }}>
              <MDBRow className='row-cols-1 row-cols-md-2 g-4' style={{ height: "auto" }}>
                <MDBCol>
                  <MDBCard>
                    <MDBCardImage
                      src={ImageLogoSplash}
                      alt='...'
                      position='top'
                    />
                    <MDBCardBody>
                      <MDBCardTitle>What is Invoto?</MDBCardTitle>
                      <MDBCardText>
                        Invoto is a platform where you can automate interpreting your bills & invoices.All you have to do is just upload an image of your bill/invoice and wait for Invoto to interprete it. Invoto will extract and present all the significant information in the bill to you.
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol>
                  <MDBCard>
                    <MDBCardImage
                      src={ImageInvoiceCover}
                      alt='...'
                      position='top'
                    />
                    <MDBCardBody>
                      <MDBCardTitle>Why Invoto?</MDBCardTitle>
                      <MDBCardText>
                        A shopper purchasing a pile of consumer goods at a convenience store in United States may easily point their mobile device at the bill and it would easily recognize different parts of the bill and interpret the contents. The device might even be capable of paying the bill off. This isn’t achieved through the use of a sophisticated barcode or a QR code but just with the image of the bill itself. While this is possible almost at any store in the US, halfway across the globe, here in Sri Lanka, it isn’t a regular discipline that is accustomed at a regular store, usually not even in a supermarket haunted by elites. This might partly be due to the unavailability of well-trained models for extracting relevant details from the image. With Invoto, we provide a community-driven web application where the application itself would allow a user to get their bills labelled and extract relevant information such as total amount etc. automatically.
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md='12'>
                  <MDBCard>
                    <MDBCardImage
                      src={ImageSupportCover}
                      alt='...'
                      position='top'
                    />
                    <MDBCardBody>
                      <MDBCardTitle>What do we Support?</MDBCardTitle>
                      <MDBCardText>
                        Anyone can contribute as volunteers to enhance the models used for data extraction by uploading the images of the bills they find or receive and labelling the important segments. External developers will be provided with the endpoints for integrating Invoto with their applications. Invoto will successfully read out bills in different formats and label them out with a greater accuracy than existing models. This will be extremely helpful for different business organizations and companies with their finance management, inventory tracking, automation of loyalty, rewards, and cash back programs and at the simplest case of splitting the restaurant bill between a group of people and calculating the tip. In a local context, Invoto will assist local businesses in different aspects of automation of tasks such as bill payments.
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>

            {/* Labelled Bills Section */}
            <div className="d-flex justify-content-center w-75 mx-auto py-3 px-2" style={{ height: "auto" }}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol size='md-12'>
                    <MDBTypography tag='div' className='display-6 title text-light text-center mt-4 mb-3'>
                      Our Services
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol size='md-12'>
                    <MDBCarousel showIndicators showControls fade className='mb-4'>
                      <MDBCarouselInner>
                        <MDBCarouselItem className='active'>
                          <MDBCarouselElement src={ImagePortfolioInvoice1} alt='...' className='home-portfolio-image' />
                          <MDBCarouselCaption className='text-black'>
                            <h5>Interpretation of Invoices</h5>
                            <p>Invoto is capable of interpreting any kind of bills & invoices.</p>
                          </MDBCarouselCaption>
                        </MDBCarouselItem>

                        <MDBCarouselItem>
                          <MDBCarouselElement src={ImagePortfolioAPI2} alt='...' className='home-portfolio-image' />
                          <MDBCarouselCaption>
                            <h5>Developer Friendly API</h5>
                            <p>Invoto provides a well-documented developer friendly API.</p>
                          </MDBCarouselCaption>
                        </MDBCarouselItem>

                        <MDBCarouselItem>
                          <MDBCarouselElement src={ImagePortfolioDL3} alt='...' className='home-portfolio-image' />
                          <MDBCarouselCaption className='text-black'>
                            <h5>State-of-the-Art AI Technology</h5>
                            <p>Invoto utilizes state of the art deep learning models to provide you with the best possible accuracy for interpretations.</p>
                          </MDBCarouselCaption>
                        </MDBCarouselItem>

                        <MDBCarouselItem>
                          <MDBCarouselElement src={ImagePortfolioVol4} alt='...' className='home-portfolio-image' />
                          <MDBCarouselCaption>
                            <h5>Community driven Volunteer Programme</h5>
                            <p>Invoto encourages all the volunteers out there who are willing to make the world a better place to participate in the volunteer programme.</p>
                          </MDBCarouselCaption>
                        </MDBCarouselItem>
                      </MDBCarouselInner>
                    </MDBCarousel>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>

            {/* API Guidelines Section */}
            <div className="d-flex justify-content-center w-75 mx-auto mt-2 py-3 px-2" style={{ height: "auto" }}>
              <MDBCard background='dark' className='text-white'>
                <MDBCardImage overlay className='' src={ImageDev} alt='...' />
                <MDBCardOverlay>
                  <MDBCardTitle><h1>Built by Developers</h1></MDBCardTitle>
                  <MDBCardText>
                    Invoto API has a proper documentation describing every parameter in every endpoint. Developers will not have to struggle understanding the requests they make. Play with the endpoints a bit and you will understand how they serve.
                  </MDBCardText>
                  <MDBCardText>Invoto guarantees 99.99% uptime for API.</MDBCardText>
                  <MDBCardLink href='api-docs'>Read Docs</MDBCardLink>
                </MDBCardOverlay>
              </MDBCard>
            </div>

            {/* Try It Now and Contact Us Section */}
            <div className="d-flex justify-content-center w-75 mx-auto mt-2 py-3 px-2" style={{ height: "auto" }}>
              <MDBContainer>
                <MDBRow className='mb-3'>
                  <MDBCol size='md-6'>
                    <MDBTypography tag='div' className='h5 text-center'>
                      <MDBBadge className='ms-2 mb-2'>Demo</MDBBadge>
                    </MDBTypography>

                    <MDBCard className='text-center'>
                      <MDBCardHeader><h3 className='text-center pt-3'>Want to try it out now?</h3></MDBCardHeader>
                      <MDBCardBody>
                        <MDBCardTitle>A Quick Test</MDBCardTitle>
                        <MDBCardText>You can try out our services without signing up at first. Please find a proper bill/invoice beforehand. </MDBCardText>
                        <MDBBtn href='try-now'>Try Now</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol size='md-6'>
                    <MDBTypography tag='div' className='h5 text-center'>
                      <MDBBadge className='ms-2 mb-2'>Get in Touch</MDBBadge>
                    </MDBTypography>

                    <MDBCard>
                      <MDBCardHeader><h3 className='text-center pt-3'>Any Issue? Contact Us!</h3></MDBCardHeader>
                      <MDBCardBody>
                        <form>
                          <MDBInput id='frmContactTxtName' wrapperClass='mb-4' label='Name' />
                          <MDBInput type='email' id='frmContactTxtEmail' wrapperClass='mb-4' label='Email address' />
                          <MDBInput wrapperClass='mb-4' textarea id='frmContactTxtMessage' rows={4} label='Message' />

                          <MDBCheckbox
                            wrapperClass='d-flex justify-content-center mb-4'
                            id='frmContactChkSendCopy'
                            label='Send me a copy of this message'
                            defaultChecked
                          />

                          <MDBBtn type='submit' className='mb-4' block>
                            Send
                          </MDBBtn>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </div>
        </>
      </div>
    );
  }

}

export default Home;

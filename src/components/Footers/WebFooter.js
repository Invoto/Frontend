import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit';
import "./webfooter.css";

class WebFooter extends React.Component {
  render() {
    return (
      <MDBFooter className='text-center' color='white' bgColor='dark'>
        <MDBContainer className='p-2'>
          <section className='my-4'>
            <a className='btn btn-outline-light btn-floating m-1' href='https://www.facebook.com/invoto' role='button' target="_balnk">
              <MDBIcon fab icon='facebook-f' />
            </a>
  
            <a className='btn btn-outline-light btn-floating m-1' href='https://twitter.com/invoto' role='button' target="_balnk">
              <MDBIcon fab icon='twitter' />
            </a>

            <a className='btn btn-outline-light btn-floating m-1' href='https://www.instagram.com/invoto' role='button' target="_balnk">
              <MDBIcon fab icon='instagram' />
            </a>
  
            <a className='btn btn-outline-light btn-floating m-1' href='https://www.linkedin.com/in/invoto/' role='button' target="_balnk">
              <MDBIcon fab icon='linkedin-in' />
            </a>
  
            <a className='btn btn-outline-light btn-floating m-1' href='https://github.com/invoto' role='button' target="_balnk">
              <MDBIcon fab icon='github' />
            </a>
          </section>
  
          <section className='subscribe'>
            <form action=''>
              <div className='row d-flex justify-content-center'>
                <div className='col-auto'>
                  <p className='pt-2'>
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
  
                <MDBCol md='5' start='12'>
                  <MDBInput contrast type='frmSubscribeTxtEmail' label='Email address' className='mb-4' />
                </MDBCol>
  
                <div className='col-auto'>
                  <MDBBtn outline color='light' type='submit' className='mb-4'>
                    Subscribe
                  </MDBBtn>
                </div>
              </div>
            </form>
          </section>
  
          <section className='mb-4'>
            <p>
              Your company may not be in the software business, but eventually, a software company will be in your business.
            </p>
          </section>
        </MDBContainer>

        <MDBContainer>
          <MDBRow>
            <MDBCol size='md' className=' mb-4 col-example'>
              <a href='/' className='text-white'>
                    Home
              </a>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <a href='about-us' className='text-white'>
                    About Us
              </a>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <a href='try-now' className='text-white'>
                    Try It Now
              </a>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <a href='volunteer' className='text-white'>
                    Volunteer
              </a>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <a href='api-docs' className='text-white'>
                    API Documentation
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
  
        <div className='text-center px-3 pt-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2022 Copyright:
        </div>

        <div className='text-center px-3 pb-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          Invoto
        </div>
      </MDBFooter>
    );
  }
}

export default WebFooter;

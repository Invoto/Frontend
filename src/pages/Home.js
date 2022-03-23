import React from 'react';
import {
  MDBContainer
} from 'mdb-react-ui-kit';

import "../assets/css/pages/home.css";

class Home extends React.Component {

  render() {
    return (
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
    );
  }

}

export default Home;

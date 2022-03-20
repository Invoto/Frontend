import React from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
} from 'mdb-react-ui-kit';
import crestInvoto from "../../assets/img/crestInvoto.png";
import "./webnavbar.css";

class WebNavBar extends React.Component {

    render() {
        const { routes } = this.props;
        return (
            <>
                <MDBNavbar expand='lg' dark bgColor='black' className="invoto">
                    <MDBContainer fluid>
                        <MDBNavbarBrand href='#'>
                            <img
                                src={crestInvoto}
                                height='30'
                                alt=''
                                loading='lazy'
                            />
                            <div className="text-light invoto-logo">Invoto</div>
                        </MDBNavbarBrand>

                        <MDBCollapse navbar show={true}>
                            <MDBNavbarNav>
                                {
                                    routes.map((entry, key) => {
                                        if (!entry.hasOwnProperty("rightAlign")) {
                                            return (
                                                <MDBNavbarItem key={key}>
                                                    <MDBNavbarLink href={entry.path}>{entry.name}</MDBNavbarLink>
                                                </MDBNavbarItem>
                                            );
                                        }
                                    })
                                }
                            </MDBNavbarNav>

                            <MDBNavbarNav right="true" fullWidth={false} className='mb-2 mb-lg-0'>
                                {
                                    routes.map((entry, key) => {
                                        if (entry.hasOwnProperty("rightAlign")) {
                                            return (
                                                <MDBNavbarItem key={key} className="my-4">
                                                    <MDBNavbarLink href={entry.path}>
                                                        <MDBBtn color="secondary" className='me-2' type='button'>
                                                            {entry.name}
                                                        </MDBBtn>
                                                    </MDBNavbarLink>
                                                </MDBNavbarItem>
                                            );
                                        }
                                        else {

                                        }
                                    })
                                }
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </>
        );
    }

}

export default WebNavBar;

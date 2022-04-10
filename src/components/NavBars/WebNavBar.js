import React from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';
import crestInvoto from "../../assets/img/crestInvoto.png";
import "./webnavbar.css";

class WebNavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showNavNoToggler: false,
        };
    }

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

                        <MDBNavbarToggler
                            type='button'
                            aria-expanded='false'
                            aria-label='Toggle Navigation'
                            onClick={() => {
                                this.setState({
                                    showNavNoToggler: !this.state.showNavNoToggler,
                                });
                            }}
                        >
                            <MDBIcon icon='bars' fas />
                        </MDBNavbarToggler>

                        <MDBCollapse navbar show={this.state.showNavNoToggler}>
                            <MDBNavbarNav>
                                {
                                    routes.map((entry, key) => {
                                        if (!entry.hasOwnProperty("rightAlign")) {
                                            return (
                                                <MDBNavbarItem key={key} className="mx-3">
                                                    <MDBNavbarLink href={entry.path}>{entry.name}</MDBNavbarLink>
                                                </MDBNavbarItem>
                                            );
                                        }
                                    })
                                }
                            </MDBNavbarNav>

                            <MDBNavbarNav className='justify-content-end'>
                                {
                                    routes.map((entry, key) => {
                                        if (entry.hasOwnProperty("rightAlign")) {
                                            return (
                                                <MDBNavbarItem key={key} className="mx-3">
                                                    <MDBNavbarLink href={entry.path}>{entry.name}</MDBNavbarLink>
                                                </MDBNavbarItem>
                                            );
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

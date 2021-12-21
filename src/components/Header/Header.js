import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import logo from "./logo512.png"
const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="light">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
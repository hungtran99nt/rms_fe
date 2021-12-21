import React from 'react';
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {IconContext} from 'react-icons';
import logo from "./logo512.png";
import profileImage from "./github.png";
import {Col, DropdownButton, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";


function Navbar({showSidebar, account, setAccount, token}) {

    let header;
    if (account && token) {
        header = (
            <>
                <div className="float-start align-items-center">
                    <Link className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Link to="/" className='mb-3' >
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-bottom"
                        />{' '}
                    </Link>
                </div>
                <div className="float-end d-flex">
                    <p
                        className="fs-5 text-white align-middle m-1">{account.fullName}</p>
                    <DropdownButton id="dropdown-basic-button" className="px-3 "
                                    title={
                                        <div className="pull-left">
                                            <img className="thumbnail-image"
                                                 src={profileImage}
                                                 alt="user pic"
                                            />
                                        </div>
                                    }
                    >
                        <DropdownItem href="/profile">Profile</DropdownItem>
                        <DropdownItem type="button"
                                      className="btn del-button btn-outline-secondary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirmModal"
                        >
                            Logout
                        </DropdownItem>
                    </DropdownButton>
                </div>
            </>
        );
    } else {
        header = (
            <Row className="container-fluid">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-2">
                        <div className="logo">
                        </div>
                    </div>
            </Row>
        );
    }

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <nav className='navbar h-50'>
                    {header}
                </nav>
                <div className="modal fade" id="confirmModal" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content"
                             style={{borderRadius: "7px"}}
                        >
                            <div className="modal-header px-4"
                                 style={{backgroundColor: "#9fa2a34f", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}>
                                <h5 className="modal-title logout fw-bold"
                                    id="exampleModalLabel"
                                >Are you sure?</h5>
                            </div>
                            <div className="modal-body logout px-4">
                                <p style={{color: "black"}}>Do you want to log out?</p>
                                <div className="d-flex justify-content-between">
                                    <a href="/login" className="a-btn btn btn-primary"
                                       style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                                       onClick={() => {
                                           localStorage.clear();
                                       }}
                                    >Log out</a>
                                    <button type="button" className="a-btn btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            style={{backgroundColor: "transparent", color: "#6c757d"}}
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
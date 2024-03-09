import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    TabContent,
    TabPane,
    Row,
    Col
} from "reactstrap";

const AdminDash = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
    const [activeTab, setActiveTab] = useState("1");
    const [publicComplaints, setPublicComplaints] = useState([]);
    const [escalatedComplaints, setEscalatedComplaints] = useState([]);

    useEffect(() => {
        let req1 = axios.get('https://odprojback.onrender.com/complaint/get', {
            params: {
                private: false
            }
        });
        req1.then((res) => {
            setPublicComplaints(res.data);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        let req2 = axios.get('https://odprojback.onrender.com/complaint/get', {
            params: {
                escalated: true
            }
        });
        req2.then((res) => {
            setEscalatedComplaints(res.data);
        }).catch((err) => {
            console.log(err)
        })
    },[])



    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };


    const signOut = () => {
        localStorage.clear();
    }

    const openDetails = (comp) => {
        localStorage.setItem('comp',JSON.stringify(comp));
    }

    const HeaderBar = () => {
        return (
            <Navbar className="bg-primary" expand="lg">
                <Container>
                    <NavbarBrand href="/admin" onClick={(e) => e.preventDefault()}>
                        Complaints
                    </NavbarBrand>
                    <button
                        aria-controls="navbarNav"
                        aria-expanded={false}
                        aria-label="Toggle navigation"
                        className="navbar-toggler navbar-toggler-right burger-menu"
                        data-target="#navbar-primary"
                        data-toggle="collapse"
                        id="navbar-primary"
                        type="button"
                    >
                        <span className="navbar-toggler-bar" />
                        <span className="navbar-toggler-bar" />
                        <span className="navbar-toggler-bar" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-primary">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: 'pointer' }}
                                    href="/stud-login"
                                    onClick={signOut}
                                >
                                    <i
                                        style={{ paddingRight: 5 }}
                                        aria-hidden={true}
                                        className="nc-icon nc-button-power"
                                    />
                                    Sign Out
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        )
    };

    const PublicComplaints = () => {
        return (
            <Row>
                <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                        {publicComplaints.map((comp, ind) => {
                            return (
                                <div key={ind}>
                                    <a href="/complaintdetail" onClick={() => openDetails(comp)}>
                                    <li style={{ cursor: 'pointer' }}>
                                        <Row>
                                            <Col style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }} className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                <b style={{ padding: 10 }}>{comp.votes}</b>
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                <h6>
                                                    {comp.title} <br />
                                                    <small>{comp.detail.substring(0,200)}</small>
                                                </h6>
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                <h6>
                                                    {comp.status}
                                                </h6>
                                            </Col>
                                        </Row>
                                    </li>
                                    </a>
                                    <hr />
                                </div>
                            )
                        })}

                    </ul>
                </Col>
            </Row>
        )
    }

    const EscalatedComplaints = () => {
        return (
            <Row>
                <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                        {escalatedComplaints.map((comp, ind) => {
                            return (
                                <div key={ind}>
                                    <a href="/complaintdetail" onClick={() => openDetails(comp)}>
                                    <li style={{ cursor: 'pointer' }} onClick={() => openDetails(comp)} href="/complaintdetails">
                                        <Row>
                                            <Col style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }} className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                
                                                <b style={{ padding: 10 }}>{comp.date}</b>
                                                
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                <h6>
                                                    {comp.title} <br />
                                                    <small>{comp.detail.substring(0,200)}</small>
                                                </h6>
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                <h6>
                                                    {comp.status}
                                                </h6>
                                            </Col>
                                        </Row>
                                    </li>
                                    </a>
                                    <hr />
                                </div>
                            )
                        })}
                    </ul>
                </Col>
            </Row>
        )
    }


    const ComplaintLists = () => {

        return (
            <>
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <Nav role="tablist" tabs>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={activeTab === "1" ? "active" : ""}
                                    onClick={() => {
                                        toggle("1");
                                    }}
                                >
                                    Public
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: 'pointer' }}
                                    className={activeTab === "2" ? "active" : ""}
                                    onClick={() => {
                                        toggle("2");
                                    }}
                                >
                                    Escalated
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <TabContent className="following" activeTab={activeTab}>
                    <TabPane className="text-center" tabId="1" id="follows">
                        {publicComplaints.length !== 0 ?
                            <PublicComplaints /> :
                            <h3 className="text-muted">Not any complaints yet :(</h3>
                        }
                    </TabPane>
                    <TabPane className="text-center" tabId="2" id="following">
                        {escalatedComplaints.length !== 0 ?
                            <EscalatedComplaints /> :
                            <h3 className="text-muted">Not any complaints yet :(</h3>
                        }
                    </TabPane>
                </TabContent>
            </>
        )
    }

    return (
        <div>
            <HeaderBar />
            <ComplaintLists />
        </div>
    )
}

export default AdminDash
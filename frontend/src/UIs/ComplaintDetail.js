import React, {  useState } from 'react';
import axios from 'axios';

import {
    UncontrolledCollapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
    CustomInput
} from "reactstrap";

const ComplaintDetail = () => {
    const statusList = ["Not started", "Ongoing", "Addressed"];
    const complaint = JSON.parse(localStorage.getItem('comp'));
    const user = JSON.parse(localStorage.getItem('user'));

    const [isChecked, setIsChecked] = useState(complaint.resolved_student);
    const [status, setStatus] = useState(complaint.status);
    const [escalate, setEscalate] = useState(complaint.escalated);

    const signOut = () => {
        localStorage.clear();
    }
    const HeaderBar = () => {
        return (
            <Navbar className="bg-primary" expand="lg">
                <Container>
                    <NavbarBrand href={"/"+user.auth} >
                        Detail
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

    const DetailArea = () => {
        return (
            <Col style={{ textAlign: "center" }}>
                <Row className="ml-auto mr-auto" md="6">
                    <h3 className="title mx-auto">{complaint.title}</h3>
                </Row>
                <blockquote style={{ padding: 20 }} className="blockquote">
                    <p>
                        {complaint.detail}
                    </p>
                    <br />
                    <footer className="blockquote-footer">
                        {complaint.roll}
                    </footer>
                </blockquote>
            </Col>
        )
    }

    const ScheduleArea = () => {
        return (
            <div style={{ textAlign: "center" }}>
                <Row>
                    <Col md="3" sm="6">
                        <label className="label label-info mr-1">Thread started on</label>
                        <b>{complaint.date}</b>
                    </Col>
                    <Col className="mr-auto ml-auto" md="2" sm="3">
                        <label className="label label-warning mr-1">Initiated on</label>
                        <b>{complaint.ongoing.length !== 0 ? complaint.ongoing : "Not initiated"}</b>
                    </Col>
                    <Col className="mr-auto" md="2" sm="3">
                        <label className="label label-success mr-1">Addressed on</label>
                        <b>{complaint.addressed.length !== 0 ? complaint.addressed : "Not addressed"}</b>
                    </Col>
                </Row>
            </div>

        )
    }

    const Status = () => {
        return (
            <div style={{ padding: 20 }}>
                {user.auth === "student" && user.roll === complaint.roll ? <>
                <label>Status</label>
                <FormGroup check>
                <Label check>
                  <Input checked={isChecked} onChange={()=>setIsChecked(!isChecked)} type="checkbox" />
                  Resolved <span className="form-check-sign" />
                </Label>
                </FormGroup>
                </> : ""}
                
                {user.auth === "dept" && user.department === complaint.department ? <><label>Status</label>
                <UncontrolledDropdown>
                    <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="dropdownMenuButton"
                        nav
                        onClick={(e) => e.preventDefault()}
                        role="button"
                    >
                        {status}
                    </DropdownToggle>
                    <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                    >
                        {statusList.map((val, ind) => {
                            return (
                                <div key={ind}>
                                    <DropdownItem
                                        onClick={(e) => setStatus(val)}
                                    >
                                        {val}
                                    </DropdownItem>
                                    <DropdownItem divider />
                                </div>
                            )
                        })}
                    </DropdownMenu>
                </UncontrolledDropdown></> : ""}
            </div>
        )
    }

    const DocsArea = () => {
        return (
            complaint.docs.length !== 0 ?
            <div style={{padding:20}}>
                <label>Supporting Documents</label>
                <br/>
                {complaint.docs.map((val,ind) => {
                    return(
                        <a key={ind} href={val}>
                        <label className="label label-danger mr-1">Document {ind+1}</label>
                        </a>
                    )
                })}
            </div> : ""
        )
    }

    const EscalateArea = () => {
        return (
            <div style={{padding:20}}>
                <label>Escalate Complaint</label>
                <CustomInput
                    type="switch"
                    checked={escalate}
                    id="exampleCustomSwitch"
                    name="customSwitch"
                    label="Escalate"
                    onChange={(e)=> setEscalate(!escalate) }
                />
            </div>
        )
    }
    function getCurrentDate() {
        const separator = "-";
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
    
        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    const updateComplaint = () => {
        if(isChecked)
        if(isChecked && user.auth === "student"){
            complaint.resolved_student = isChecked;
            axios.post("https://odprojback.onrender.com/complaint/delete", complaint)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Updated");
                        break;
                    default:
                        break;
                }
            })
            .catch((e) =>{ 
                alert("Error in server :(")
                console.log("error catch ->" + e)
            });
            return;
        }
        if (user.auth === "dept"){
            complaint.status = status;
            if(status === "Ongoing"){
                complaint.ongoing = getCurrentDate();
            }
            else if (status === "Addressed"){
                complaint.resolved_department = true;
                complaint.addressed = getCurrentDate();
            }
        }
        complaint.escalated = escalate;
        axios.post("https://odprojback.onrender.com/complaint/update", complaint)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Updated");
                        break;
                    default:
                        break;
                }
            })
            .catch((e) =>{ 
                alert("Error in server :(")
                console.log("error catch ->" + e)
            })
    }

    return (
        <div>
            <HeaderBar />
            <DetailArea />
            <br />
            <ScheduleArea />
            <br />
            <Status />
            {
                user.auth === "student" && user.roll === complaint.roll ? <EscalateArea /> : ""
            }
            
            <DocsArea />
            {
                (user.auth === "student" && user.roll === complaint.roll)
                || (user.auth === "dept" && user.department === complaint.department) ? <Button
                style={{margin:20}}
                className="btn-round"
                color="success"
                type="button"
                onClick={updateComplaint}
            >
                Update
            </Button> : ""
            }
            
        </div>
    )
}

export default ComplaintDetail
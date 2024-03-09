import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./../firebaseConfig";

import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Container,
    Row,
    Col,
    Button,
    Card,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    CustomInput,
} from "reactstrap";

const AddComplaint = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const departmentList = ["Water Department", "CNC", "Electrical Department", "Anti Ragging", "SGC", "Other"]
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [detail, setDetail] = useState("");
    const [docs, setDocs] = useState([]);
    const [chosenFiles, setChosenFiles] = useState([])
    const [percent, setPercent] = React.useState(0);

    const signOut = () => {
        localStorage.clear();
    }

    const handleChange1 = (e) => {
        setTitle(e.target.value);
    }
    const handleChange2 = (e) => {
        setDetail(e.target.value);
    }

    const publishComplaint = () => {
        if (title.length === 0 || detail.length === 0 || department.length === 0) {
            return;
        }
        var comp = {
            roll: user.roll,
            department: department,
            title: title,
            detail: detail,
            docs: docs,
            private: isPrivate
        }
        console.log(comp);
        axios.post("https://odprojback.onrender.com/complaint/add", comp)
            .then(res => {
                const r = res.data.message;
                console.log(r);
                switch (r) {
                    case "1":
                        alert("Complaint Added");
                        setTitle("");
                        setDetail("");
                        break;
                    default:
                        break;
                }
            })
            .catch((e) => {
                alert("Error in server :(")
                console.log("error catch ->" + e)
            })
    }

    const handleUploads = (e) => {
        const temp = Array.prototype.slice.call(e.target.files)
        setChosenFiles(temp);
    }


    const uploadToFirebase = () => {
        if (chosenFiles.length === 0) {
            return;
        }
        const promises = [];
        chosenFiles.forEach((file) => {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    var percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => console.log(err),
                async () => {
                    // download url
                    await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        docs.push(url);
                        setDocs([...docs]);
                    });
                }
            );
        });
        Promise.all(promises)
            .then(()=>alert("All uploaded"))
            .catch((err)=>console.log(err));        
            
    };

    const HeaderBar = () => {
        return (
            <Navbar className="bg-primary" expand="lg">
                <Container>
                    <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                        New Complaint
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

    const ComplaintArea = () => {
        return (
            <div
                className="section section-login"
            >
                <Container >
                    <Row>
                        <Col className="mx-auto" lg="4" md="4">
                            <Card>
                                <label>Department</label>
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
                                        {department.length !== 0 ? department : "Select Department"}
                                    </DropdownToggle>
                                    <DropdownMenu
                                        aria-labelledby="dropdownMenuButton"
                                        className="dropdown-info"
                                    >
                                        {departmentList.map((val, ind) => {
                                            return (
                                                <div key={ind}>
                                                    <DropdownItem
                                                        onClick={(e) => setDepartment(val)}
                                                    >
                                                        {val}
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                </div>
                                            )
                                        })}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <br />
                                <DropdownItem divider />
                                <label>Title</label>
                                <InputGroup className="form-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="nc-icon nc-tag-content" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Title" value={title} onChange={handleChange1} type="text" />
                                </InputGroup>
                                <br />
                                <DropdownItem divider />
                                <label>Private?</label>
                                <CustomInput
                                    type="switch"
                                    checked={isPrivate}
                                    id="exampleCustomSwitch1"
                                    name="customSwitch1"
                                    label="Private"
                                    onChange={(e) => setIsPrivate(!isPrivate)}
                                />
                                <br />
                                <DropdownItem divider />
                                <label>Issue</label>
                                <InputGroup className="form-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="nc-icon nc-tag-content" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Detail..." value={detail} onChange={handleChange2} type="text" />
                                </InputGroup>
                                <br />
                                <DropdownItem divider />
                                <label>Supporting Docs</label>
                                <form
                                    className="uploader"
                                    encType="multipart/form-data"
                                >
                                    <input type="file" id="file" multiple onChange={handleUploads} />

                                </form>
                                <button
                                    onClick={uploadToFirebase}>Upload Docs</button>
                                <p>{percent}% done</p>
                                <br />
                                <DropdownItem divider />
                                <Button
                                    block
                                    className="btn-round"
                                    color="success"
                                    type="button"
                                    onClick={publishComplaint}
                                >
                                    Publish
                                </Button>
                            </Card>
                            <div className="col text-center">
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    return (
        <div>
            <HeaderBar />
            {ComplaintArea()}
        </div>
    )
}

export default AddComplaint
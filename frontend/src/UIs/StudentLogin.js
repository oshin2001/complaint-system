import React, {useState} from 'react';
import axios from 'axios';

import {
    Button,
    Card,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

const StudentLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [person, setPerson] = useState();
    const handleChange1 = (e) => {
        setEmail(e.target.value);
    }
    const handleChange2 = (e) => {
        setPassword(e.target.value);
    }

    const login = () => {
        if (email.length === 0 || password.length === 0){
            return;
        }
        axios.post("https://odprojback.onrender.com/login", {email,password})
            .then(res => {
                const r = res.data.message;
                console.log(res)
                switch (r) {
                    case "0":
                        alert("Wrong credential");
                        break;
                    default:
                        if (r) {
                            localStorage.setItem('user',JSON.stringify(r));
                            setPerson(r.auth);
                            setVerified(true);
                            console.log(r);
                        }
                }
            })
            .catch((e) => {
                console.log("error catch ->" + e)
            })
    }

return (
    <div
        className="section section-image section-login"
        style={{
            backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
    >
        <Container >
            <Row>
                <Col className="mx-auto" lg="4" md="6">
                    <Card className="card-register">
                        <h3 className="title mx-auto">Login Page</h3>
                        <Form className="register-form">
                            <label>Email</label>
                            <InputGroup className="form-group-no-border">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-email-85" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange1} value={email} placeholder="Email" type="email" />
                            </InputGroup>
                            
                            <label>Password</label>
                            <InputGroup className="form-group-no-border">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-key-25" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={handleChange2} value={password} placeholder="Password" type="password" />
                            </InputGroup>
                            <Button
                                block
                                className="btn-round"
                                type="button"
                                onClick={login}
                            >
                                Verify
                            </Button>
                            {verified ?
                            <Button
                            block
                            className="btn-round"
                            color="danger"
                            type="button"
                            href={"/"+person}
                            >
                                Login
                            </Button> : ""
                            }
                        </Form>
                    </Card>
                    <div className="col text-center">
              </div>
                </Col>
            </Row>
        </Container>
    </div>
);
}

export default StudentLogin
import React from 'react';
import sidebanner from '../../../images/blockchain.png';
import {Container,Row,Col,Image} from 'react-bootstrap';
import RegisterForm from './RegisterForm'
export default function login() {
    return (
        <Container fluid className="h100" >
            <Row className="h-100">
                <Col md={6}>
                    <Image src={`${sidebanner}`} rounded id="sizer"/>
                </Col>
                <Col md={6} className="h-100">
                    <RegisterForm/>
                </Col>
            </Row>
        </Container>
    )
}
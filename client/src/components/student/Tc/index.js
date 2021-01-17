import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {Container,Row,Col} from 'react-bootstrap'
import CreatePoll from './Form'
export default function TimeTable() {
    return (
    <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
        <Col sm={2}className="d-flex justify-content-center" >
                
                </Col>
            <Col sm={8} className="justify-content-center"> 
            <center>
                <CreatePoll/>
            </center>
            </Col>
            <Col sm={2}className="d-flex justify-content-center" >
                
            </Col>
        </Row>
        </Container>
    </React.Fragment>
    )
}


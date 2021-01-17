import React from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import Boxes from './Boxes'
export default function Rempart() {
    return(
        <Container fluid>
        <Row >
        <Col sm={2} className="cent justify-content-center"> 
                    
            </Col>
            <Col sm={8} className="cent justify-content-center"> 
                <Boxes/>      
            </Col>
            <Col sm={2} className="cent justify-content-center"> 
                     
            </Col>
        </Row>
        </Container>
    )
}


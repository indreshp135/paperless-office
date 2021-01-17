import React, { useState } from 'react';
import sidebanner from '../images/blockchain.png';
import {useHistory} from 'react-router-dom'
import {Container,Row,Col,Image,Button} from 'react-bootstrap';
import {Input} from 'reactstrap'
export default function FirstPage() {
    const [state,setstate]=useState('');
    let history =  useHistory()
    const change = (e)=>{
        setstate(e.target.value)
    }
    const proceed =()=>{
        if(state==="Student")
        history.push('/student/login')
        if(state==="Admin")
        history.push('/prof/login')
    }
    return (
        <Container fluid className="h100" >
            <Row className="h-100">
                <Col md={6}>
                    <Image src={`${sidebanner}`} rounded id="sizer"/>
                </Col>
                <Col md={6} className="h-100">
                <div className="form-box vertical-center">
                    <h2>BlockChain Files</h2>
                    <hr/>
                    <Input type="select" onChange={change}>
                        <option>Choose</option>
                        <option>Admin</option>
                        <option>Student</option>
                    </Input>
                    <br/>
                    <Button variant="primary" onClick={proceed}>Proceed</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

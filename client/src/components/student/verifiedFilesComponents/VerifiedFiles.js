import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {useSelector} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
import {Table} from 'reactstrap'
import {BACKEND,IPFS} from '../../../config.js'
import axios from 'axios'
const Sentfiles = () => {
    const user = useSelector(state => state.user)
    const theme = user.theme
    const [blockchainfiles,setArray] = React.useState([])
    const auth = useSelector(state => state.auth)
    React.useEffect(() => {
        const {data} =  axios.post(`${BACKEND}/userall/sent`,{user:auth.user},{headers: {
            Authorization: `Bearer ${auth.token}`
          }})
        if(data){
            setArray(data)
        }
    }, [auth])
    const subjects = ["BONAFIDE","TC"]
    const light=  subjects.map((subject)=>
        (<React.Fragment>
       
        <Table bordered striped>
        <thead className="light2"><tr><th><h4><u>{subject}</u></h4></th></tr></thead>
        <tbody>
            {blockchainfiles.map((blockchainfile,index)=>subject===blockchainfile.type?
            <tr><td><a className = "text-secondary" rel="noopener noreferrer" href ={`${IPFS}/${blockchainfile.hash}`} target="_blank" >{`${index+1}.${subject}`}</a></td></tr>
        :null)}
        </tbody>
        </Table>
        <br/>
        <br/>
        </React.Fragment>)
    )
    const dark = subjects.map((subject)=>
        (<React.Fragment>
       
        <Table bordered dark striped>
        <thead className="dark2"><tr><th><h4><u>{subject}</u></h4></th></tr></thead>
        <tbody>
            {blockchainfiles.map((blockchainfile,index)=>subject===blockchainfile.type?
            <tr><td><a className = "text-white" rel="noopener noreferrer" href ={`${IPFS}/${blockchainfile.hash}`} target="_blank" >{`${index+1}.${subject}`}</a></td></tr>
        :null)}
        </tbody>
        </Table>
        <br/>
        <br/>
        </React.Fragment>)
    )
    return (
        <React.Fragment>
        <NavBar/>
        <Container fluid>
        <Row >
        <Col sm={2} className=" justify-content-center"></Col>
            <Col sm={8} className=" justify-content-center"> 
                {theme?<div className="dark-color">
            <h2>Verified Files</h2>
            <br/>{dark}</div>:<React.Fragment><h2>Verified Files</h2>
            <br/>{light}</React.Fragment>}
            </Col>
            <Col sm={2} className=" justify-content-center"></Col>
        </Row>
        </Container>
    </React.Fragment>
    );
}

export default Sentfiles;

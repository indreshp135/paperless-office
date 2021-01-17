import React from 'react'
import NavBar from '../mainComponents/NavBar'
import {useSelector} from 'react-redux'
import {Container,Row,Col,Button} from 'react-bootstrap'
import {Table} from 'reactstrap'
import {BACKEND,IPFS} from '../../../config.js'
import axios from 'axios'
const Sentfiles = () => {
    const user = useSelector(state => state.user)
    const theme = user.theme
    const auth = useSelector(state => state.auth)
    const [blockchainfiles,setArray] = React.useState([])
    React.useEffect(() => {
        const {data} =  axios.post(`${BACKEND}/admin/toverify`,{user:auth.user},{headers: {
            Authorization: `Bearer ${auth.token}`
          }}).then(res=>setArray(res.data))
    }, [auth])
    const change = async(e)=>{
        console.log(e.target.id)
        await axios.post(`${BACKEND}/signpdf/${e.target.id}`)
        .then((req)=>{
            console.log(req.data)
            setTimeout(()=>{},2000)
            setArray(req.data)
        })
    }
    const subjects = ["BONAFIDE","TC"]
    const light=  subjects.map((subject)=>
        (<React.Fragment>
        <Table striped >
        <thead className="light2"><tr><th><h4><u>{subject}</u></h4></th></tr></thead>
        <tbody>
            {blockchainfiles.map((blockchainfile,index)=>blockchainfile&&subject===blockchainfile.type?
            <><tr><td><a className = "text-secondary" rel="noopener noreferrer" href ={`${IPFS}/${blockchainfile.hash}`} target="_blank" >{`${blockchainfile.hash}.pdf`}</a></td>
            <td><Button onClick={change} id={blockchainfile.hash}  variant="warning" className="right-it">
                Verified Document Sign It and Send
            </Button></td>
            </tr>
            </>
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
            {blockchainfiles.map((blockchainfile,index)=>blockchainfile&&subject===blockchainfile.type?
            <tr><td><a className = "text-white" rel="noopener noreferrer" href ={`${IPFS}/${blockchainfile.hash}`} target="_blank" >{`${blockchainfile.hash}.pdf`}</a></td>
            <td><Button onClick={change} id={blockchainfile.hash} variant="warning" className="right-it">
                Verified Document Sign It and Send
            </Button></td>
            </tr>
            
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
            <h2>Recieved Document for Verification</h2>
            <br/>{dark}</div>:<React.Fragment><h2>Recieved Document for Verification</h2>
            <br/>{light}</React.Fragment>}
            </Col>
            <Col sm={2} className=" justify-content-center"></Col>
        </Row>
        </Container>
    </React.Fragment>
    );
}

export default Sentfiles;

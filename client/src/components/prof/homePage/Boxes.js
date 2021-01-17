
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendar,faPoll,faBookReader } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux'
const box = [{},{name:"Requested Verification",icon:faCalendar},{name:"Verified",icon:faPoll},{name:"Ledger",icon:faBookReader}];
export default function Boxes() {
    let history = useHistory();
    const user = useSelector(state => state.user)
    const theme = user.theme;
    const red1 = (e)=>{
        history.push('/prof/'+box[1].name);
    }
    const red2 = (e)=>{
        history.push('/prof/'+box[2].name);
    }
    const red3 = (e)=>{
        window.location.href = "http://localhost:5984/_utils/#database/mychannel_mycc/_all_docs"
    }
    const light= (
        <React.Fragment> 
        <span md={6} className="box d-flex justify-content-center light2" id={box[1].name} onClick={red1} key={box[1].name} name={box[1].name}>
            <FontAwesomeIcon icon = {box[1].icon} size="6x" className="tpm" id={box[1].name} key={box[1].name} name={box[1].name} onClick={red1}/>
            <h6 className="btm" id={box[1].name} name={box[1].name}onClick={red1}>{box[1].name}</h6>
        </span>
        <span md={6} className="box d-flex justify-content-center light2" id={box[2].name} onClick={red2} key={box[2].name} name={box[2].name}>
            <FontAwesomeIcon icon = {box[2].icon} size="6x" className="tpm" id={box[2].name} key={box[2].name} name={box[2].name} onClick={red2}/>
            <h6 className="btm" id={box[2].name} name={box[2].name}onClick={red2}>{box[2].name}</h6>
        </span>
        <span md={6} className="box d-flex justify-content-center light2" id={box[3].name} onClick={red3} key={box[3].name} name={box[3].name}>
            <FontAwesomeIcon icon = {box[3].icon} size="6x" className="tpm" id={box[3].name} key={box[3].name} name={box[3].name} onClick={red3}/>
            <h6 className="btm" id={box[3].name} name={box[3].name}onClick={red3}>{box[3].name}</h6>
        </span>
        </React.Fragment>
    )
    const dark =(
        <React.Fragment>
        
        <span md={6} className="box d-flex justify-content-center dark2" id={box[1].name} onClick={red1} key={box[1].name} name={box[1].name}>
            <FontAwesomeIcon icon = {box[1].icon} size="6x" className="tpm text-white" id={box[1].name} key={box[1].name} name={box[1].name} onClick={red1}/>
            <h6 className="btm dark-color" id={box[1].name} name={box[1].name}onClick={red1}>{box[1].name}</h6>
        </span>
        <span md={6} className="box d-flex justify-content-center dark2" id={box[2].name} onClick={red2} key={box[2].name} name={box[2].name}>
            <FontAwesomeIcon icon = {box[2].icon} size="6x" className="tpm text-white" id={box[2].name} key={box[2].name} name={box[2].name} onClick={red2}/>
            <h6 className="btm dark-color" id={box[2].name} name={box[2].name}onClick={red2}>{box[2].name}</h6>
        </span>
        <span md={6} className="box d-flex justify-content-center dark2" id={box[3].name} onClick={red3} key={box[3].name} name={box[3].name}>
            <FontAwesomeIcon icon = {box[3].icon} size="6x" className="tpm text-white" id={box[3].name} key={box[3].name} name={box[3].name} onClick={red3}/>
            <h6 className="btm dark-color" id={box[3].name} name={box[3].name}onClick={red3}>{box[3].name}</h6>
        </span>
        </React.Fragment>
    )
    return(<center>{theme?dark:light}</center>)
}
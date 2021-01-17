import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useSelector} from 'react-redux'
import FirstPage from './components/FirstPage'
import ProfHomepage from './components/prof/homePage/Homepage'
import Homepage from './components/student/homePage/Homepage'
import SentFiles from './components/student/sentFilesComponents/Sentfiles.js'
import Bonafide from './components/student/Bonafide'
import Tc from './components/student/Tc'
import Verified from './components/student/verifiedFilesComponents/VerifiedFiles.js'
import ProfSentFiles from './components/prof/sentFilesComponents/Sentfiles.js'
import ProfVerified from './components/prof/verifiedFilesComponents/VerifiedFiles.js'
import ProfLogin from './components/prof/authComponents/Login'
import Login from './components/student/authComponents/Login'
import Register from './components/student/authComponents/Register'

export default function Routers (){
    const user = useSelector(state => state.user)
    const theme=user.theme;
    const th = theme?"dark1":"light1";

    return(
        <div className={`whole ${th}`}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <FirstPage/>
                    </Route>
                    <Route path="/prof/login"exact>
                        <ProfLogin/>
                    </Route>
                    {/* <Route path="/prof/register"exact>
                        <ProfRegister/>
                    </Route> */}
                    <Route path="/prof/home" exact>
                        <ProfHomepage/>
                    </Route>                    
                    <Route path="/prof/Verified" exact>
                        <ProfSentFiles/>
                    </Route>
                    <Route path="/prof/Requested Verification" exact>
                        <ProfVerified/>
                    </Route>
                    <Route path="/student/login"exact>
                        <Login/>
                    </Route>
                    <Route path="/student/register"exact>
                        <Register/>
                    </Route>
                    <Route path="/student/home" exact>
                        <Homepage/>
                    </Route>
                    
                    <Route path="/student/Sent Documents" exact>
                        <SentFiles/>
                    </Route>
                    <Route path="/student/Bonafide" exact>
                        <Bonafide/>
                    </Route>
                    <Route path="/student/Tc" exact>
                        <Tc/>
                    </Route>
                    <Route path="/student/Verified and Returned" exact>
                        <Verified/>
                    </Route>
                    
                </Switch>
            </Router>
        </div>
    )
}
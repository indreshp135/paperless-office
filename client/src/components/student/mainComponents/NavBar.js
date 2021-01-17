import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSignOutAlt,faSun,faMoon} from '@fortawesome/free-solid-svg-icons'
import {Navbar,NavbarBrand,Nav,NavItem} from 'reactstrap'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { changeTheme } from '../../../redux/userStates/userActions'
export default function NavBar() {
    let history=useHistory()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const theme = user.theme;
    const rd = ()=>{
        history.push('/student/home')
    }
    const lgt = ()=>{
        dispatch({type:'LOGOUT_SUCCESS'})
        history.push('/')
    }
    const ct = ()=>{
        dispatch(changeTheme())
    }
    const dark = (
        <Navbar expand className="dark2">
            <NavbarBrand className="text-white">Student</NavbarBrand>
            <Nav className="ml-auto pd-3" navbar>
                <NavItem>
                    <Tooltip title="Home">
                        <IconButton className="dark2" onClick={rd} aria-label="Home">
                            <FontAwesomeIcon icon={faHome} className="text-white"/>
                        </IconButton>
                    </Tooltip>
                </NavItem>
                <NavItem>
                    <Tooltip title="Change Theme">
                    <IconButton className="dark2" onClick={ct} aria-label="ChanegeTheme">
                        <FontAwesomeIcon icon={faMoon} className="text-white"/>
                    </IconButton>
                    </Tooltip>
                </NavItem>
                <NavItem>
                    <Tooltip title="Log Out">
                    <IconButton className="dark2" onClick={lgt} aria-label="LogOut">
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-white"/>
                    </IconButton>
                    </Tooltip>
                </NavItem>
            </Nav>
        </Navbar>
    )
    const light =  (
        <Navbar expand className="light2">
            <NavbarBrand>Student</NavbarBrand>
            <Nav className="ml-auto pd-3" navbar>
                <NavItem>
                    <Tooltip title="Home">
                        <IconButton className="light2" onClick={rd} aria-label="Home">
                            <FontAwesomeIcon icon={faHome}/>
                        </IconButton>
                    </Tooltip>
                </NavItem>
                <NavItem>
                    <Tooltip title="Change Theme">
                    <IconButton className="light2" onClick={ct} aria-label="ChanegeTheme">
                        <FontAwesomeIcon icon={faSun} />
                    </IconButton>
                    </Tooltip>
                </NavItem>
                <NavItem>
                    <Tooltip title="Log Out">
                    <IconButton className="light2" onClick={lgt} aria-label="LogOut">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </IconButton>
                    </Tooltip>
                </NavItem>
            </Nav>
        </Navbar>
    )
    return (theme?dark:light)
}

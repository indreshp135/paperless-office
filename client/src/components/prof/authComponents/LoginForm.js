import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {Form,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {login} from '../../../redux/auth/authActions'
export default function LoginForm() {
    let history = useHistory();
    const [name, setname] = useState('');
    const [password,setPassword]=useState('');
    const handleChangename = (e) => setname(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      if(auth.isAuthenticated)
        history.push('/prof/home');
    }, [auth,history]);
    const submitForm =async(e)=>
    {
      e.preventDefault();
      const user = { name, password, orgName: "Administration" };
      // Attempt to login
      await dispatch(login(user));
    }
    return (
      
        <div className="form-box vertical-center">
            <h1>Admin Portal</h1>
            <hr/>
            <Form method="post">
                <Form.Group >
                  <Form.Control type="name" name="name" onChange={handleChangename} placeholder="Enter Your Name " />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Your Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Login
                </Button>
            </Form>
            <hr/>
        </div>
    )
}
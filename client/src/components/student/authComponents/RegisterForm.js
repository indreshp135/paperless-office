import React,{useState} from 'react';
import { useDispatch } from 'react-redux'
import {Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {register} from '../../../redux/auth/authActions'
export default function LoginForm() {
    const [regno, setregno] = useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const handleChangeregno = (e) => setregno(e.target.value);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const dispatch = useDispatch();
   
    const submitForm =async(e)=>
    {
      e.preventDefault();
      const user = { regno,name, password, orgName: "Students" };
      // Attempt to login
      await dispatch(register(user));
    }
    return (
        <div className="form-box vertical-center">
            <h1>Student Portal</h1>
            <hr/>
            <Form method="post">
                <Form.Group >
                    <Form.Control type="text" name="regno" onChange={handleChangeregno} placeholder="Enter NITT Register No" />
                </Form.Group>
                <Form.Group >
                    <Form.Control type="text" name="name" onChange={handleChangeName} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="pwd" onChange={handleChangePassword} placeholder="Enter Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Register
                </Button>
            </Form>
            <hr/>
            Already Registered? 
            <Link to='/student/Login'>Login</Link>
        </div>
    )
}

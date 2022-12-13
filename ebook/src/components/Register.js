import { connect } from 'react-redux';
import * as React from 'react';
import {Form , Button } from 'react-bootstrap';
import {registerUser} from '../redux/actions/userAction';
import {useHistory} from 'react-router-dom';

const Register = ({registerUser , user}) => {
    const [name , setName] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
    const [roll , setRoll] = React.useState('normal')

    const history = useHistory();

    return (
        <div style = {{ maxWidth: '500px' }} className = 'm-auto'>
            <h2 className='text-center my-5'>Register</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value = {name} onChange = {e => setName(e.target.value)} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  value = {email} onChange = {e => setEmail(e.target.value)} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                {user.user.roll == 'admin'?
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Roll</Form.Label>
                        <Form.Select onChange = {e => setRoll(e.target.value)}>
                            <option value='normal'>Normal</option>
                            <option value='admin'>Admin</option>
                        </Form.Select>
                    </Form.Group>
                    :""
                }
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value = {password} onChange = {e => setPassword(e.target.value)}  />
                </Form.Group>
                <div className='text-center'>
                    <Button variant="primary" type="submit" onClick = {e => {e.preventDefault(); registerUser({name , email , password} , history)}}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps , {registerUser})(Register);

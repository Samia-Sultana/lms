import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
const StudentLogin = () => {
    return (
        
        <div>
            <LoginForm></LoginForm>
            <p><small>Not registered yet?<Link to="/registration">Register</Link></small></p>
           
        </div>
    );
};

export default StudentLogin;
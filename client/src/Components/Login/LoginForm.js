import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import firebaseConfig from '../Configuration/firebaseConfig';
import './LoginForm.css';

const app = initializeApp(firebaseConfig);

const LoginForm = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch(`http://localhost:8080${location.pathname}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(resData => console.log(resData))
        
    }

    return (
        <div className="login-container">
                <div className="login-signup-form">
                    <Form onSubmit={handleSubmit(onSubmit)} className="">
                        <Row>
                            <Col><Link to="/">Admin</Link></Col>
                            <Col><Link to="/student">Student</Link></Col>
                            <Col><Link to="/teacher">Teacher</Link></Col>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3" controlId="userEmail">
                            <Form.Control size="sm" type="email" {...register("userEmail", { required: true })} placeholder="Email" />
                            {errors.userEmail && "email is required"}
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="userPassword">
                            <Form.Control size="sm" type="password"  {...register("userPassword", { required: true })} placeholder="Password" />
                            {errors.userPassword?.type === 'required' && "password is required"}
                        </Form.Group>

                        <Button type="submit">Login</Button>
                        </Row>
                    </Form>
                </div>
                <div className="signup-login-with">
                        <button /*</div>onClick={handleGoogleLogin}*/ className="googleLogin"><FontAwesomeIcon icon={faGoogle} /> Sign-in with Google</button>
                </div>
            </div>
    );
};

export default LoginForm;
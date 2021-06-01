/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';
import showPwdImg from '../../assets/eye-slash-solid.svg';
import hidePwdImg from '../../assets/eye-solid.svg';

import API from '../../api';

const LoginForm = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  
    const loginSubmit = (loginData) => {
        API.post('/loginasadmin', loginData)
            .then((response) => {
                console.log(response);
                setError('');
                setSubmitted(true);
                reset();

                // const userData = response.data.token;
                // localStorage.setItem('userToken', userData);

                const userData = response.data.data;

                localStorage.setItem('userToken', JSON.stringify(userData));
            })
            .catch((err) => {
                console.log(err.response);
                const {status, data} = err.response
                setSubmitted(false);
                if(status === 400){
                    setError(data.message.text)
                }
                if(status === 401){
                    setError(data.message.text)
                }
            });
    }

    const onSubmit = async (data) => {
      loginSubmit(data)
    };
  
    // console.log(watch("email")); // watch input value by passing the name of it

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form id="login" onSubmit={handleSubmit(onSubmit)}>
                {submitted && 
                    <Alert variant="success">
                    <div className='success-message' style={{textAlign: "center"}}>Success! Thank you for your response</div>
                    </Alert>
                }
                {error !== '' && 
                    <Alert variant="danger">
                    <div className='danger-message' style={{textAlign: "center"}}>{error}</div>
                    </Alert>
                }
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" className="form-control" name="email" id="email" placeholder="Enter email" autoComplete="on"
                        {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                        {errors.email?.type === "required" && <span style={{color: 'red'}}>Email is required</span>}
                        {errors.email?.type === "pattern" && <span style={{color: 'red'}}>Type valid email</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>   
                        <div className="pwd-container">
                        <input type={isRevealPwd ? "text" : "password"} className="form-control" name="password" id="password" 
                        placeholder="Enter password" autoComplete="on"
                        {...register("password", { required: true,  minLength: 8, 
                        // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                        })} />
                        {errors.password?.type === "required" && <span style={{color: 'red'}}>Password is required</span>}
                        {errors.password?.type === "minLength" && <span style={{color: 'red'}}>Password minimum 8 characters long</span>}
                        {/* {errors.password?.type === "pattern" && <span style={{color: 'red'}}>Password is not strong</span>} */}

                        <img className="toggle-image"
                        title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? hidePwdImg : showPwdImg}
                        onClick={() => setIsRevealPwd(prevState => !prevState)} />
                        </div>




                        
                    </div>

                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="remember" name="remember" value={true}
                            {...register("remember", {required: true})} />

                            <label className="custom-control-label" htmlFor="remember">Remember me</label>
                        </div>
                        {errors.remember && <span style={{color: 'red'}}>Required</span>}
                    </div> */}

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-left display_sys">
                        Have not account <Link to="/register">register?</Link>
                    </p> &nbsp;&nbsp;
                    <p className="forgot-password text-right display_sys">
                        Forgot <Link to="/forgetpass">password?</Link>
                    </p>
                </form>
            </div>
            <style>{eyeToggle}</style>
        </div>
    )
}

export default LoginForm;



const eyeToggle = `

.pwd-container {
    position: relative;
  }
   
  .pwd-container img {
    cursor: pointer;
    position: absolute;
    width: 20px;
    right: 8px;
    top: 8px;
  }
`;

import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';

const LoginForm = () => {

    const [submitted, setSubmitted] = useState(false);

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, watch, reset, control,  formState: { errors, isSubmitting } } = useForm();
  
    const onSubmit = async (data) => {
      // alert(JSON.stringify(data));
      // JSON.stringify(value, replacer, space)
      console.log("Submitted", JSON.stringify(data, null, 2));
      setSubmitted(true);
      reset();
    };
  
    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form id="contact" onSubmit={handleSubmit(onSubmit)}>
                {submitted && 
                    <Alert variant="success">
                    <div className='success-message' style={{textAlign: "center"}}>Success! Thank you for your response</div>
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
                        <input type="password" className="form-control" name="password" id="password" placeholder="Enter password" autoComplete="on"
                        {...register("password", { required: true,  minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/})} />
                        {errors.password?.type === "required" && <span style={{color: 'red'}}>Password is required</span>}
                        {errors.password?.type === "minLength" && <span style={{color: 'red'}}>Password minimum 8 characters long</span>}
                        {errors.password?.type === "pattern" && <span style={{color: 'red'}}>Password is not strong</span>}
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="remember" name="remember" value={true}
                            {...register("remember", {required: true})} />

                            <label className="custom-control-label" htmlFor="remember">Remember me</label>
                        </div>
                        {errors.remember && <span style={{color: 'red'}}>Required</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-left display_sys">
                        Have not account <Link to="/register">register?</Link>
                    </p> &nbsp;&nbsp;
                    <p className="forgot-password text-right display_sys">
                        Forgot <Link to="/forgetpass">password?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginForm

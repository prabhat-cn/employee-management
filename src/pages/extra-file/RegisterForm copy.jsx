import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';

const RegisterForm = () => {

    const [submitted, setSubmitted] = useState(false);
  
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  
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
                <form id="register" onSubmit={handleSubmit(onSubmit)}>
                {submitted && 
                    <Alert variant="success">
                    <div className='success-message' style={{textAlign: "center"}}>Success! Thank you for your response</div>
                    </Alert>
                }
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control"
                        name="name" id="name" placeholder="Type name" autoComplete="on" {...register("name", { required: true, minLength: 3, maxLength: 20, 
                        pattern: /^[A-Za-z]+$/i })} />

                        { errors.name?.type === "required" && <span style={{color: 'red'}}>Name required</span> }
                        { errors.name?.type === "pattern" && <span style={{color: 'red'}}>Only letter accepted</span> }
                        { errors.name?.type === "minLength" && <span style={{color: 'red'}}>Minimum length is 3 letters</span> }
                        { errors.name?.type === "maxLength" && <span style={{color: 'red'}}>Maximum length is 20 letters</span> }
                    </div>

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
                        <label>Confirm password</label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Re-enter password" autoComplete="on"
                        {...register("confirmPassword", { required: true,  minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/})} />
                        {errors.password?.type === "required" && <span style={{color: 'red'}}>Password is required</span>}
                        {errors.password?.type === "minLength" && <span style={{color: 'red'}}>Password minimum 8 characters long</span>}
                        {errors.password?.type === "pattern" && <span style={{color: 'red'}}>Password is not strong</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/login">sign in?</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default RegisterForm

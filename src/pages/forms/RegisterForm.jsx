import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';

const RegisterForm = () => {

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
                <form>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
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

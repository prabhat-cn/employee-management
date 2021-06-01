/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import showPwdImg from '../../assets/eye-slash-solid.svg';
import hidePwdImg from '../../assets/eye-solid.svg';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RegisterForm = () => {

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [submitted, setSubmitted] = useState(false);
  
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const contactSchema = Yup.object().shape({

        name: Yup.string()
          .required("Name required")
          .min(3, "Must be 3 letters")
          .max(12, "Must be 12 letters or less")
          .matches(/^[A-Za-z]+$/i, "Name should be letter"),
  
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),

        // password: Yup.string().required("Please provide a valid password"),
        // passwordMin: Yup.string().oneOf([Yup.ref('password'), null]).min(8, 'Minimum 8 characters'),
        // passwordLC: Yup.string().oneOf([Yup.ref('password'), null]).matches(/[a-z]/, "One Lowercase" ),
        // passwordUC: Yup.string().oneOf([Yup.ref('password'), null]).matches(/[A-Z]/, "One Uppercase" ),
        

        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required')
          .matches(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})",
            "One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const onSubmit = async (values, submitProps) => {
        console.log("form-values", JSON.stringify(values, null, 2));
        // console.log('submitProps', submitProps)
        await sleep(500);
        setSubmitted(true);
        submitProps.resetForm()
        // alert(JSON.stringify(values, null, 2));
    }

    return (
        <>
        <Formik
          initialValues={initialValues}
          validationSchema={contactSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            
            //  console.log('formik', formik.values)
            const { errors, touched, isValid, dirty } = formik;
            
            return (
              <>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <Form id="register">
                {submitted && 
                <Alert variant="success">
                <div className='success-message' style={{textAlign: "center"}}>Success! Thank you for your response</div>
                </Alert>

                }
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <Field type="text" name="name" id="name" 
                        placeholder="Type name" autoComplete="on" 
                        className={"form-control"+ " " + (errors.name && touched.name ? 
                        'input-error' : null)} />

                        <ErrorMessage name="name" style={{color: 'red', marginBottom: "4px"}} component="span" className="error" />

                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <Field type="text" name="email" id="email" 
                        placeholder="Enter email" autoComplete="on" className={'form-control'+ " " + (errors.email && touched.email ? "input-error" : null)} />
                        <ErrorMessage name="email" style={{color: 'red', marginBottom: "4px"}} component="span" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="pwd-container">
                        <Field type={isRevealPwd ? "text" : "password"} name="password" id="password" placeholder="Enter password" autoComplete="on" 
                        className={'form-control'+ " " + (errors.password && touched.password ? "input-error" : null)} />
                        <ErrorMessage name="password" style={{color: 'red', marginBottom: "4px"}} component="span" className="error" />
                        <img className="toggle-image"
                        title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? hidePwdImg : showPwdImg}
                        onClick={() => setIsRevealPwd(prevState => !prevState)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm password</label>
                        <div className="pwd-container">
                        <Field type={isRevealPwd ? "text" : "password"} name="confirmPassword" id="confirmPassword" placeholder="Re-enter password" autoComplete="on" 
                        className={'form-control'+ " " + (errors.confirmPassword && touched.confirmPassword ? "input-error" : null)} />
                        <ErrorMessage name="confirmPassword" style={{color: 'red', marginBottom: "4px"}} component="span" className="error" />
                        <img className="toggle-image"
                        title={isRevealPwd ? "Hide password" : "Show password"} src={isRevealPwd ? hidePwdImg : showPwdImg}
                        onClick={() => setIsRevealPwd(prevState => !prevState)} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

                    {/* <button
                    type="submit"
                    className={"btn btn-primary btn-block"+' '+(!(dirty && isValid) ? "disabled" : "")}
                    disabled={!(dirty && isValid)}>
                    Sign Up
                    </button> */}
                  
                    <p className="forgot-password text-right">
                        Already registered <Link to="/login">sign in?</Link>
                    </p>
                </Form>
            </div>
            <style>{eyeToggle}</style>
        </div>
        </>
          );
        }}
        
    </Formik>
        
        
        </>

    )
}

export default RegisterForm;

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

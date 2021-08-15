import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ForgetPassword = () => {

    const [submitted, setSubmitted] = useState(false);
  
    const initialValues = {
        email: '',
    };

    const contactSchema = Yup.object().shape({
  
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
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
                        <label>Email address</label>
                        <Field type="text" name="email" id="email" 
                        placeholder="Enter email" autoComplete="on" className={'form-control'+ " " + (errors.email && touched.email ? "input-error" : null)} />
                        <ErrorMessage name="email" style={{color: 'red', marginBottom: "4px"}} component="span" className="error" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Reset</button>

                  
                    <p className="forgot-password text-right">
                        Have Password <Link to="/login">sign in?</Link>
                    </p>
                </Form>
            </div>
        </div>
        </>
          );
        }}
        
    </Formik>
        
        
        </>

    )
}

export default ForgetPassword

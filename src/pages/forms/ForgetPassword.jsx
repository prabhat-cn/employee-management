import React from 'react'
import {Link} from 'react-router-dom'

const ForgetPassword = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Forget Password</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Have Password <Link to="/login">sign in?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword

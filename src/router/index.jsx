import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from '../components/Navbar';

import {
    LoginForm,
    ForgetPassword,
    RegisterForm,
    DepartmentList,
    EmployeeList,
    ViewEmployee
  } from './route-list';
  


const PrivateRoute = ({component: Component, auth, name, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (auth === true ? <Component {...props} name={name} /> : <Redirect to="/login" />)}
    />
);
  
const PublicRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (auth !== true ? <Component {...props} /> : <Redirect to="/" />)}
    />
);
  


const Routes = () => {
    const userData = localStorage.getItem('userToken');
    const authState = userData ? true : false;

    return (
        <Router>
            {authState && (<Navbar />)}
            <Switch>
                {/* global */}
                {/* <Route exact path="/" component={HELLO} /> */}
                
                {/* only public */}
                <PublicRoute exact auth={authState} path="/login" component={LoginForm} />
                <PublicRoute exact auth={authState} path="/register" component={RegisterForm} />
                <PublicRoute exact auth={authState} path="/forgetpass" component={ForgetPassword} />
                
                {/* only private */}
                <PrivateRoute exact auth={authState} path="/department" component={DepartmentList} />
                <PrivateRoute exact auth={authState} path="/employee" component={EmployeeList} />
                <PrivateRoute exact auth={authState} path="/viewemployee/:id" component={ViewEmployee} />

                {/* condonation */}
                {authState ? (
                    <Redirect exact from="/" to="/department" />
                ) : (
                    <Redirect from="/" to="/login" />
                )}

            </Switch>
        </Router>
    )
}

export default Routes

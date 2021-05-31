import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from '../components/Navbar';

import {
    LoginForm,
    RegisterForm,
    DepartmentList,
    EmployeeList
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
  


const Routes = (props) => {
    const authState = false;

    return (
        <Router>
            {authState && (<Navbar />)}
            <Switch>
                {/* global */}
                {/* <Route exact path="/" component={HELLO} /> */}
                
                {/* only public */}
                <PublicRoute exact auth={authState} path="/login" component={LoginForm} />
                <PublicRoute exact auth={authState} path="/register" component={RegisterForm} />
                
                {/* only private */}
                <PrivateRoute exact auth={authState} path="/department" component={DepartmentList} />
                <PrivateRoute exact auth={authState} path="/employee" component={EmployeeList} />

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

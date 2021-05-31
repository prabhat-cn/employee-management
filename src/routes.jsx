import React, { Suspense, lazy } from 'react'
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import LoginForm from './pages/forms/LoginForm';
import RegisterForm from './pages/forms/RegisterForm';

// const LoginForm = lazy(() => import('./pages/forms/LoginForm'));
// const RegisterForm = lazy(() => import('./pages/forms/RegisterForm'));
const DepartmentList = lazy(() => import('./pages/DepartmentList'));
const EmployeeList = lazy(() => import('./pages/EmployeeList'));

const Routes = (props) => {
    return (
        <>
        <Router>
        <Switch>
          <Route exact path='/' component={LoginForm}/>
          <Route exact path='/register' component={RegisterForm}/>
        </Switch>
        </Router>
        <Router>
            {/* <Switch>
                <Route exact path='/' render={props =>(
                <Suspense fallback={<Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />} >
                    <LoginForm {...props} />
                </Suspense>)} />

                <Route exact path='/register' render={props =>(
                <Suspense fallback={<Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />} >
                    <RegisterForm {...props} />
                </Suspense>)} />
            </Switch> */}
            
            <Navbar >
            <Switch>

                <Route exact path='/department' render={props =>(
                <Suspense fallback={<Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />} >
                    <DepartmentList {...props} />
                </Suspense>)} />

                <Route exact path='/employees' render={props =>(<Suspense fallback={<Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />} >
                    <EmployeeList {...props} />
                </Suspense>)} />
                <Route exact path='*'><h2>404 Not Found!</h2></Route> 
            </Switch>
            
        </Navbar>
        </Router>
        </>
    )
}

export default Routes

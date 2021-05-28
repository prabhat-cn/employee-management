import React, { Suspense, lazy } from 'react'
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';
// import DepartmentList from './pages/DepartmentList';
// import EmployeeList from './pages/EmployeeList';

const DepartmentList = lazy(() => import('./pages/DepartmentList'));
const EmployeeList = lazy(() => import('./pages/EmployeeList'));
const Routes = (props) => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/' render={props =>(<Suspense fallback={<p>Loading...</p>} >
                    <DepartmentList {...props} />
                </Suspense>)} />

                <Route exact path='/emplyees' render={props =>(<Suspense fallback={<p>Loading...</p>} >
                    <EmployeeList {...props} />
                </Suspense>)} />
                <Route exact path='*'><h2>404 Not Found!</h2></Route> 
            </Switch>
        </Router>
    )
}

export default Routes

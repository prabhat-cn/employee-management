
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Loadable from 'react-loadable';

const LoginForm = Loadable({
    loader: () => import('../pages/forms/LoginForm'),
    loading: Loader,
});

const ForgetPassword = Loadable({
    loader: () => import('../pages/forms/ForgetPassword'),
    loading: Loader,
});

const RegisterForm = Loadable({
    loader: () => import('../pages/forms/RegisterForm'),
    loading: Loader,
});

const DepartmentList = Loadable({
    loader: () => import('../pages/DepartmentList'),
    loading: Loader,
});

const EmployeeList = Loadable({
    loader: () => import('../pages/EmployeeList'),
    loading: Loader,
});

const ViewEmployee = Loadable({
    loader: () => import('../pages/ViewEmployee'),
    loading: Loader,
});

export {
    LoginForm,
    ForgetPassword,
    RegisterForm,
    DepartmentList,
    EmployeeList,
    ViewEmployee
};
  
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import API from '../api';
const ViewEmployee = () => {

    const [singleEmployee, setSingleEmployee] = useState({name: '', _id: ''});
    // "id" is same as route
    const {id} = useParams();

    const getEmployeeId = async (id) => {
        try{
            const empData = await API.get(`/employee/${id}?populate=department`);
            console.log('view-empData->', empData.data.data);
            setSingleEmployee(empData.data.data);
        }catch(error){
            console.log(error.message);
        }
    };

    useEffect(() => {
        getEmployeeId(id)
    }, [])

    return (
        <>
        <div className="container list-data">
            <div className="row line-height-top">
                
                <div className="col">
                    <h4 style={{textAlign: "center"}}>View Employee</h4>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>
                            <span className="text-info">{singleEmployee.name}</span> details
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-6">Name:</div>
                            <div className="col-6">{singleEmployee.name}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6">Department:</div>
                            <div className="col-6">{singleEmployee?.department?.name}</div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        </>
    )
}

export default ViewEmployee

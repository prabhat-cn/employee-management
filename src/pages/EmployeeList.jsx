import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { Button, Modal } from 'antd';
import Avatar from 'react-avatar'
import API from '../api';
import { Alert } from 'react-bootstrap';
import {ViewIcon, EditIcon, DeleteIcon} from '../constant/icons'


const EmployeeList = () => {

  const [employee, setEmployee] = useState([]);
  const [singleEmployee, setSingleEmployee] = useState({name: '', _id: ''});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
 

    // Search
    const[search, setSearch] = useState("");
    const[query, setQuery] = useState('name')

  const getEmployee = async () => {
    setLoading(true);
    try{
      const deptData = await API.get('/employee');
      setEmployee(deptData.data.data);
      setLoading(false);
    }catch(error){
      console.log(error.message);
    }
  };

  const getEmployeeId = async (id) => {
    try{
      const deptData = await API.get(`/employee/${id}`);
      setSingleEmployee(deptData.data.data);
      showModal();
    }catch(error){
      console.log(error.message);
    }
  };


  const viewDetail = (id) => {
    getEmployeeId(id);
  }

 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getEmployee();
  }, [query]);

  const updateSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    // to reset after search button click
    setSearch('');
    
  };


  // for edit form  
  const [submitted, setSubmitted] = useState(false);
  const [department, setDepartment] = useState([]);
  const [editvalue,setEditvalues] = useState({});
  // functions to build form returned by useForm() hook
  const { register, watch, reset,  formState: { errors } } = useForm();

  const handleSubmit = async (e) => {
    // JSON.stringify(value, replacer, space)
    e.preventDefault();
    const t = JSON.parse(localStorage.getItem('userToken'))
    console.log(t.token)
    console.log(editvalue)
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${t.token}`
        }
    }
    console.log(config)
   const { datas } = await API.put(`/employee/${editvalue._id}`, editvalue, config)
    setSubmitted(true);
    reset();
  };
  const getDepartments = async (id) => {
    try{
      const deptDatas = await API.get(`/department`);
      // console.log(deptDatas)
      setDepartment(deptDatas.data.data)
    }catch(error){
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDepartments();
  }, [])

  const editEmployee = (m) => {
    
    getEmployeeId(m._id)
    setEditvalues({
      ...editvalue,
      ...m
    })
    console.log(editvalue)
  }
  // // delete
  // const updateEmployee = (id, updatedUser) => {
  //   // setEditing(false)
  
  //   setEditing(users.map((user) => (user.id === id ? updatedUser : user)))
  // }

  return (
    <>
      {/* <Modal title="View Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2>{singleEmployee.name}</h2>
      </Modal> */}

      <Modal title="Edit Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <form id="contact" onSubmit={handleSubmit}>
          <div className="row">
          {submitted && 
          <Alert variant="success">
          <div className='success-message' style={{textAlign: "center"}}>Success! Thank you for your response</div>
          </Alert>
          
          }
            <div className="form-group">
                <input type="hidden" className="form-control" name="id" id="id" value={editvalue._id} />

                <label>Name</label>
                <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={editvalue.name}
                onChange={e=>setEditvalues({...editvalue,name:e.target.value})}
                // {...register("name", { required: true, minLength: 3, maxLength: 20, pattern: /^[A-Za-z]+$/i })} 
                />

                  {/* { errors.name?.type === "required" && <span style={{color: 'red'}}>First name required</span> }
                  { errors.name?.type === "pattern" && <span style={{color: 'red'}}>Only letter accepted</span> }
                  { errors.name?.type === "minLength" && <span style={{color: 'red'}}>Minimum length is 3 letters</span> }
                  { errors.name?.type === "maxLength" && <span style={{color: 'red'}}>Maximum length is 20 letters</span> } */}
            </div>
            <div className="form-group">
                <label>Department</label>
                <select className="form-control" name="process" {...register("process", { required: true})} 
                onChange={e=>setEditvalues({...editvalue,department:e.target.value})}>
                  <option value="">Select option</option>
                  {
                    department && department.map((dept,i)=>(
                      <option value={dept._id} key={i} selected={ editvalue.department === dept._id} >{dept.name}</option>
                    ))
                  }

                </select>
                {errors.process && <span style={{color: 'red'}}>Select any one</span>}
            </div>
            <div className="form-group">
            <br/> <button type="submit" id="form-submit" className="btn btn-primary btn-block">Save</button>
            </div>
          </div>
        </form>
      </Modal>


      <div className="container list-data">
        <div className="row">
          <div className="col-md-6"><h2>Employee List</h2></div>
          <div className="col-md-6">
          <form onSubmit={getSearch} className="search-form">
              <input 
                class="form-control me-sm-2" 
                placeholder="Search department"
                style={{
                  height: "40px",
                  display: "initial",
                  padding: "0 5px", 
                  width: "70%", 
                  fontSize:"14px"
                }}
                type="text"
                value={search} 
                onChange={updateSearch} 
              />

              <button class="btn btn-primary my-2 my-sm-0" 
              style={{
                height: "40px",
                padding: "0 5px",
                width: "20%",
              }} type="submit">Reset</button>
            </form> 
          </div>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.filter((val) => {
                if(search === ""){
                    return val
                }
                else if(val.name.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
                else if(val.search){
                    return val
                }

            }).map((m) => (
              <tr key={m._id}>
                <td scope="row">{m._id}</td>
                <td>
                <Avatar className="mr-2" name={m.name} size="45" round={true} /> {m.name}</td>
                <td>
                  <Button type="btn btn-success rounded-circle"  onClick={() => viewDetail(m._id)}>
                    <ViewIcon />
                  </Button>&nbsp;
                  <Button type="primary rounded-circle"  onClick={() => editEmployee(m)}>
                    <EditIcon />
                  </Button>&nbsp;
                  <Button type="btn btn-danger rounded-circle"  onClick={() => viewDetail(m._id)}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <style>{deptCss}</style>
      </div>
    </>
  )
}

export default EmployeeList;
const deptCss = `
.rounded-circle {
  padding: 0px 8px;
}
`;

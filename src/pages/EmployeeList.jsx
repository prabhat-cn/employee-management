import React, {useState, useEffect} from 'react'
import { Button, Modal, Input } from 'antd';
import Avatar from 'react-avatar'
import API from '../api';



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
  
  return (
    <>
      <Modal title="View Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2>{singleEmployee.name}</h2>
      </Modal>

      <div className="container">
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
              }} type="submit">Search</button>
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
                  <Button type="primary" onClick={() => viewDetail(m._id)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EmployeeList

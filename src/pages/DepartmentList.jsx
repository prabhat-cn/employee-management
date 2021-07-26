import React, {useState, useEffect} from 'react'
import Avatar from 'react-avatar'
import { Button, Modal, Input, notification } from 'antd';
import API from '../api';
import {ViewIcon, DeleteIcon} from '../constant/icons'



const DepartmentList = () => {

  const [department, setDepartment] = useState([]);
  const [singleDepartment, setSingleDepartment] = useState({name: '', _id: ''});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Search
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('name')

 

  const getDepartment = async () =>{
    setLoading(true);
    try{
    const deptData = await API.get('/department');
    setDepartment(deptData.data.data);
    setLoading(false);
    }catch(error){
      console.log(error.message);
    }
  }

  const getDepartmentId = async (id) => {
    try{
      const deptData = await API.get(`/department/${id}`);
      setSingleDepartment(deptData.data.data);
      showModal();
    }catch(error){
      console.log(error.message);
    }
  };

  const viewDetail = (id) => {
    getDepartmentId(id);
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
    getDepartment();
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

  // Delete
  const delDepartment = (delID) => {
    if(window.confirm('Do you want to delete?')){
      API.delete(`/department/${delID}`).then((delData) => {
        console.log('delDepartment', delData);
        if(delData.status === 200 || delData.statusText === "OK") {
          notification.success({
            message: 'Success',
            description:
              'Department deleted successfully',
          });
          getDepartment();
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  // const { Search } = Input;
  
  return (
    <>
      <Modal title="View Department" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2>{singleDepartment.name}</h2>
      </Modal>

      <div className="container list-data">
        <div className="row">
          <div className="col-md-6"><h3>Department List</h3></div>
          <div className="col-md-6">
            {/* <Search placeholder="input search text" onSearch={onSearch} enterButton /> */}
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
        <br/>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#Sl.No</th>
              <th scope="col">Id</th>
              <th scope="col">Department Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {department.filter((val) => {
                if(search === ""){
                    return val
                }
                else if(val.name.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
                else if(val.search){
                    return val
                }

            }).map((m, index) => (
              <tr key={m._id}>
                <td style={{'textAlign': 'center'}}>{index +1}</td>
                <td style={{'textAlign': 'left'}}>{m._id}</td>
                <td style={{'textAlign': 'left'}}>
                <Avatar className="mr-2" name={m.name} size="45" round={true} /> {m.name}</td>
                <td>
                  <Button type="btn btn-success rounded-circle"  onClick={() => viewDetail(m._id)}>
                    <ViewIcon />
                  </Button>
                  &nbsp;
                  <Button type="btn btn-danger rounded-circle"  onClick={() => delDepartment(m._id)}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      <style>{deptCss}</style>
    </>
  )
}

export default DepartmentList;

const deptCss = `
.rounded-circle {
  padding: 0px 8px;
}
`;

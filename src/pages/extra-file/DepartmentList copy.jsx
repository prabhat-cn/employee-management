import React, {useState, useEffect} from 'react'
import Avatar from 'react-avatar'
import { Button, Modal, notification, Alert, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import API from '../api';
import {ViewIcon, EditIcon, DeleteIcon} from '../constant/icons'



const DepartmentList = () => {

  const [department, setDepartment] = useState([]);
  const [singleDepartment, setSingleDepartment] = useState({name: '', _id: ''});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Search
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('name')

  // for add data
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addSubmitted, setAddSubmitted] = useState(false);
  const [addValue, setAddValue] = useState({});

  // for edit data
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);
  const [editValue, setEditValue] = useState({});

 

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

  const updateSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    // to reset after search button click
    setSearch('');
    
  };


  // add data
  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const saveAdd = (addData) => {
    API.post(
      `/department  `, 
      {name: addData.name}
    ).then((data) => {
      notification.success({
        message: 'Success',
        description:
          'Department is added successfully',
      });
      setIsAddModalVisible(false);
      getDepartment();
    }).catch((err) => {
      console.log(err);
    })
  }

  const addSubmit = (e) => {
    e.preventDefault()
    saveAdd({name: addValue.name, id: addValue._id});
  };
  const addDepartmentData = (add) => {
    console.log('add', add);
    setAddValue(add);
    setIsAddModalVisible(true);
  }

  // edit data
  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const saveEdit = (editData) => {
    API.put(
      `/department/${editData.id}`, 
      {name: editData.name}
    ).then((data) => {
      notification.success({
        message: 'Success',
        description:
          'Department is added successfully',
      });
      setIsEditModalVisible(false);
      getDepartment();
    }).catch((err) => {
      console.log(err);
    })
  }

  const editSubmit = (e) => {
    e.preventDefault()
    saveEdit({name: editValue.name, id: editValue._id});
  };
  const editDepartmentData = (edit) => {
    console.log('add', edit);
    setEditValue(edit);
    setIsEditModalVisible(true);
  }

  // Delete
  const makeDelete = (delID) => {
    if(window.confirm('Do you want to delete?')){
      API.delete(`/department/${delID}`).then((data) => {
        notification.success({
          message: 'Success',
          description:
            'Department deleted successfully',
        });
        getDepartment();
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() => {
    getDepartment();
  }, [query]);
  
  return (
    <>
      <Modal title="View Department" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2>{singleDepartment.name}</h2>
      </Modal>

      <Modal title="Add Department" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
        <form id="add" onSubmit={addSubmit}>
          <div className="row">
            {addSubmitted && 
              <Alert
                message="Success!"
                description="Employee Added"
                type="success"
                showIcon
              />
            }
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={addValue.name}
              onChange={e=>setAddValue({...addValue,name:e.target.value})}
              />
            </div>
            <div className="form-group">
              <button type="submit" id="form-submit" className="btn btn-primary btn-block">Save</button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal title="Edit Department" visible={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <form id="edit" onSubmit={editSubmit}>
          <div className="row">
            {editSubmitted && 
              <Alert
                message="Success!"
                description="Employee edited"
                type="success"
                showIcon
              />
            }
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Name" value={editValue.name}
              onChange={e=>setEditValue({...editValue,name:e.target.value})}
              />
            </div>
            <div className="form-group">
              <button type="submit" id="form-submit" className="btn btn-primary btn-block">Save</button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="container list-data">
        <div className="row line-height-top">
          <div className="col-md-4"><h4>Department List</h4></div>
          <div className="col-md-5">
            {/* <Search placeholder="input search text" onSearch={onSearch} enterButton /> */}
            <form onSubmit={getSearch} className="search-form">
              <input 
                class="form-control me-sm-2" 
                placeholder="Search department"
                style={{
                  height: "35px",
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
                  height: "35px",
                  padding: "0 5px",
                  width: "20%",
                }} type="submit">Reset</button>
            </form> 
          </div>
          <div className="col-md-3">
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={(add) => addDepartmentData(add)}>
              Add Employee
            </Button>
          </div>
        </div>
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
                  </Button>&nbsp;
                  <Button type="primary rounded-circle" onClick={() => editDepartmentData(m)}>
                    <EditIcon />
                  </Button>&nbsp;
                  <Button type="btn btn-danger rounded-circle" onClick={() => makeDelete(m._id)}>
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

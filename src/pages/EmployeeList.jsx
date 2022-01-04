import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, notification, Alert, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Avatar from 'react-avatar';
import { find } from 'lodash';
import API from '../api';
// import { Alert } from 'react-bootstrap';
import { ViewIcon, EditIcon, DeleteIcon } from '../constant/icons';

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [singleEmployee, setSingleEmployee] = useState({ name: '', _id: '' });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Search
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('name');

  // for edit form
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [department, setDepartment] = useState([]);
  const [editvalue, setEditvalues] = useState({});

  // for add employee
  const [isThirdModalVisible, setIsThirdModalVisible] = useState(false);
  const [addSubmitted, setAddSubmitted] = useState(false);
  const [addValue, setAddValue] = useState({});

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getEmployee = async () => {
    setLoading(true);
    try {
      // department respect employee
      const empDeptData = await API.get('/employee?populate=department');
      console.log('empDeptData', empDeptData.data.data);
      setEmployee(empDeptData.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEmployeeId = async (id) => {
    try {
      const singleEmpData = await API.get(`/employee/${id}`);
      setSingleEmployee(singleEmpData.data.data);
      showModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const viewDetail = (id) => {
    getEmployeeId(id);
  };

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

  const handleEditOk = () => {
    setIsSecondModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsSecondModalVisible(false);
  };

  const handleAddOk = () => {
    setIsThirdModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsThirdModalVisible(false);
  };

  const editSubmit = (e) => {
    saveEdit({
      name: editvalue.name,
      department: editvalue.department,
      id: editvalue._id,
    });
  };

  const saveEdit = (editData) => {
    API.put(`/employee/${editData.id}`, {
      name: editData.name,
      department: editData.department,
    })
      .then((data) => {
        notification.success({
          message: 'Success',
          description: 'Employee is updated successfully',
        });
        setIsSecondModalVisible(false);
        getEmployee();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delEmployee = (delID) => {
    if (window.confirm('Do you want to delete?')) {
      API.delete(`/employee/${delID}`)
        .then((delData) => {
          console.log('delEmployee', delData);
          if (delData.status === 200 || delData.statusText === 'OK') {
            notification.success({
              message: 'Success',
              description: 'Employee deleted successfully',
            });
            getEmployee();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getDepartments = async (id) => {
    try {
      const deptDatas = await API.get(`/department`);
      setDepartment(deptDatas.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editEmployee = (m) => {
    setEditvalues(m);
    setIsSecondModalVisible(true);
  };

  // add data
  const saveAdd = (addData) => {
    API.post(`/employee`, {
      name: addData.name,
      department: addData.department,
    })
      .then((data) => {
        notification.success({
          message: 'Success',
          description: 'Employee is added successfully',
        });
        setIsThirdModalVisible(false);
        getEmployee();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubmit = (e) => {
    e.preventDefault();
    saveAdd({
      name: addValue.name,
      department: addValue.department,
      id: addValue._id,
    });
  };
  const addEmployeeData = (add) => {
    console.log('add', add);
    setAddValue(add);
    setIsThirdModalVisible(true);
  };

  useEffect(() => {
    getDepartments();
    getEmployee();
  }, []);

  return (
    <>
      <Modal
        title="View Employee"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>{singleEmployee.name}</h3>
      </Modal>

      <Modal
        title="Add Employee"
        visible={isThirdModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <form id="add" onSubmit={addSubmit}>
          <div className="row">
            {addSubmitted && (
              <Alert
                message="Success!"
                description="Employee Added"
                type="success"
                showIcon
              />
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) =>
                  setAddValue({ ...addValue, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                className="form-control"
                onChange={(e) =>
                  setAddValue({ ...addValue, department: e.target.value })
                }
              >
                <option value="">Select option</option>
                {department &&
                  department.map((dept, i) => (
                    <option
                      value={dept._id}
                      key={i}
                      selected={addValue.department === dept._id}
                    >
                      {dept.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <button
                type="submit"
                id="form-submit"
                className="btn btn-primary btn-block"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Edit Employee"
        visible={isSecondModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <form id="edit" onSubmit={handleSubmit(editSubmit)}>
          <div className="row">
            {submitted && (
              <Alert variant="success">
                <div
                  className="success-message"
                  style={{ textAlign: 'center' }}
                >
                  Success! Employee saved
                </div>
              </Alert>
            )}
            <div className="form-group">
              <input
                type="hidden"
                className="form-control"
                name="id"
                id="id"
                value={editvalue._id}
              />

              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Name"
                value={editvalue.name}
                onChange={(e) =>
                  setEditvalues({ ...editvalue, name: e.target.value })
                }
                {...register('name', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />

              {errors.name?.type === 'required' && (
                <span style={{ color: 'red' }}>First name required</span>
              )}
              {errors.name?.type === 'minLength' && (
                <span style={{ color: 'red' }}>
                  Minimum length is 3 letters
                </span>
              )}
              {errors.name?.type === 'maxLength' && (
                <span style={{ color: 'red' }}>
                  Maximum length is 20 letters
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                className="form-control"
                name="process"
                {...register('process', { required: true })}
                onChange={(e) =>
                  setEditvalues({ ...editvalue, department: e.target.value })
                }
              >
                <option value="">Select option</option>
                {department &&
                  department.map((dept, i) => (
                    <option
                      value={dept._id}
                      key={i}
                      selected={editvalue.department === dept._id}
                    >
                      {dept.name}
                    </option>
                  ))}
              </select>
              {errors.process && (
                <span style={{ color: 'red' }}>Select any one</span>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                id="form-submit"
                className="btn btn-primary btn-block"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="container list-data">
        <div className="row">
          <div className="col-md-4">
            <h3>Employee List</h3>
          </div>
          <div className="col-md-5">
            <form onSubmit={getSearch} className="search-form">
              <input
                class="form-control me-sm-2"
                placeholder="Search department"
                style={{
                  height: '35px',
                  display: 'initial',
                  padding: '0 5px',
                  width: '70%',
                  fontSize: '14px',
                }}
                type="text"
                value={search}
                onChange={updateSearch}
              />

              <button
                class="btn btn-primary my-2 my-sm-0"
                style={{
                  height: '35px',
                  padding: '0 5px',
                  width: '20%',
                }}
                type="submit"
              >
                Reset
              </button>
            </form>
          </div>
          <div className="col-md-3">
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={(add) => addEmployeeData(add)}
            >
              Add Employee
            </Button>
          </div>
        </div>
        <br />

        {!loading ? (
          <>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#Sl.No</th>
                  <th scope="col">Department</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {employee
                  .filter((val) => {
                    if (search === '') {
                      return val;
                    } else if (
                      val.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    } else if (val.search) {
                      return val;
                    }
                  })
                  .map((m, index) => (
                    <tr key={m._id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'left' }}>
                        {m?.department?.name}
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        <Avatar
                          className="mr-2"
                          name={m.name}
                          size="45"
                          round={true}
                        />{' '}
                        {m.name}
                      </td>
                      <td>
                        <Button
                          type="btn btn-success rounded-circle"
                          onClick={() => viewDetail(m._id)}
                        >
                          <ViewIcon />
                        </Button>
                        &nbsp;
                        <Button
                          type="primary rounded-circle"
                          onClick={() => editEmployee(m)}
                        >
                          <EditIcon />
                        </Button>
                        &nbsp;
                        <Button
                          type="btn btn-danger rounded-circle"
                          onClick={() => delEmployee(m._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {employee.length === 0 ? (
              <h3 className="d-flex justify-content-center">
                No employee found!
              </h3>
            ) : (
              <>
                <h4>Loading...</h4>
              </>
            )}
          </>
        )}

        {/* {!loading ? (
          <>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#Sl.No</th>
                  <th scope="col">Department</th>
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

                }).map((m, index) => (
                  <tr key={m._id}>
                    <td style={{'textAlign': 'center'}}>{index + 1}</td>
                    <td style={{'textAlign': 'left'}}>{m.department.name}</td>
                    <td style={{'textAlign': 'left'}}>
                      <Avatar className="mr-2" name={m.name} size="45" round={true} /> {m.name}</td>
                    <td>
                      <Button type="btn btn-success rounded-circle"  onClick={() => viewDetail(m._id)}>
                        <ViewIcon />
                      </Button>&nbsp;
                      <Button type="primary rounded-circle"  onClick={() => editEmployee(m)}>
                        <EditIcon />
                      </Button>&nbsp;
                      <Button type="btn btn-danger rounded-circle" onClick={() => delEmployee(m._id)} >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </>
        ) : (
            <>
              <h4>Loading...</h4>
            </>
        )} */}

        <style>{deptCss}</style>
      </div>
    </>
  );
};

export default EmployeeList;
const deptCss = `
.rounded-circle {
  padding: 0px 8px;
}
`;

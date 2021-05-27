import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DepartmentList = () => {

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDepartment = async (deptName) => {
    try{
      const deptData = await axios.get('https://officeemployee.herokuapp.com/api/department');
      return deptData;

    }catch(error){
      throw error;
    }
  };

  const getData = async () => {
    try{
      const data = await getDepartment();
      setDepartment(data);
      console.log('getData->', data);
    }catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
        </tr>
      </thead>
      <tbody>
        {department !== null ? (
          <tr key={department._id}>
          <th scope="row">{department.data.data[0]._id}</th>
          <td>{department.data.data.name}</td>
        </tr>
        ) : null}
        
      </tbody>
  </table>

  )
}

export default DepartmentList

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [ pageLimit , setPageLimit ] = useState(5)
  

  const readEmployee = () => {
    axios.get(`http://localhost:8081/getEmployeeCount?page=${currentPage}&limit=${pageLimit}`, { headers: { "token": localStorage.getItem("token") } })
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          setTotalPages(Math.ceil(res.data.TotalCount / pageLimit));
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }

  const searchEmployeeData = (value) => {
    axios.get('http://localhost:8081/searchEmployee?search=' + value, { headers: { "token": localStorage.getItem("token") } })
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    readEmployee()
  }, [currentPage])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/' + id, { headers: { "token": localStorage.getItem("token") } })
      .then(res => {
        if (res.data.Status === "Success") {
          readEmployee();
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success my-3'>Add Employee</Link>
      <div className='d-flex justify-content-end'>
        <input type='text' placeholder='Search...' className='form-control' value={searchQuery} onChange={(e) => { searchEmployeeData(e.target.value); setSearchQuery(e.target.value) }} />
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return <tr key={index}>
                <td>{employee.name}</td>
                <td>{<img src={`http://localhost:8081/images/` + employee.image} alt="" className='employee_image' />}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.address}</td>
                <td>
                  <Link to={`/employeeEdit/` + employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                  <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='btn btn-outline-danger me-2' > Previous </button>
        <span>Page {currentPage} of {totalPages}</span> 
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className='btn btn-outline-success ms-2'>Next</button>
      </div>
    </div>
  )
}

export default Employee
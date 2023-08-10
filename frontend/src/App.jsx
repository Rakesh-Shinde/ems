import React from 'react'
import Login from './Component/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Employee from './Component/Employee';
import Profile from './Component/Profile';
import Home from './Component/Home'
import AddEmployee from './Component/AddEmployee';
import EditEmployee from './Component/EditEmployee'
import Start from './Component/Start';
import EmployeeDetail from './Component/EmployeeDetail';
import EmployeeLogin from './Component/EmployeeLogin';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/create' element={<AddEmployee />}></Route>
          {/* <Route path='/create' element={<AddEmployee />}></Route> */}
          <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
        </Route>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/start' element={<Start />}> </Route>
        <Route path='/employeeLogin' element={<EmployeeLogin />}> </Route>
        <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

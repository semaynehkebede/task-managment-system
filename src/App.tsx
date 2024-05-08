import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { Button } from '@mantine/core';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Layout from './pages/admin/Layout';
import Home from './pages/admin/Home';
import Project from './component/project/Project';
import GroupedProject from './component/project/GroupedProject';
import ProjectList from './component/project/ProjectList';
import Task from './component/task/Task';
import TaskList from './component/task/TaskList';
import User from './component/user/User';
import UserList from './component/user/UserList';
import UserLandingPage from './pages/users/UserLandingPage';
import UProfile from './pages/users/UProfile';
// import { getRole } from './configuration/RoleConfig';
import SingleProjectTask from './component/task/SingleProjectTask';
import PTaskList from './component/task/PTaskList';

function App() {
  // const isAdmin = getRole();
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : '';
  const isAdmin = user.role;
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<MainPage />} />
        {/* {isAdmin && ( */}
        <Route path='/admin' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='dashboard' element={<Home />} />
          <Route path='project' element={<Project />} >
            <Route path="" element={<ProjectList />} />
            <Route path="list" element={<ProjectList />} />
            <Route path="collection" element={<GroupedProject />} />
            <Route path=":id" element={<SingleProjectTask />} />
          </Route>
          <Route path='task' element={<Task />} >
            <Route path="" element={<TaskList />} />
            <Route path="list" element={<TaskList />} />
            <Route path="p-list" element={<PTaskList />} />
          </Route>

          <Route path='user' element={<User />} >
            <Route path="" element={<UserList />} />
          </Route>
          {/* <Route path="grouped/project" element={<GroupedProject />} /> */}
        </Route>
        {/* )} */}

        <Route path='/user' element={<Layout />}>
          <Route path='' element={<UserLandingPage />} />
          <Route path='dashboard' element={<UserLandingPage />} />
          <Route path='task' element={<TaskList />} />
          <Route path='profile' element={<UProfile />} />
          <Route path='user' element={<User />} >
            <Route path="" element={<UserList />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes >
    </BrowserRouter >
    // <LoginPage />
  );
}

export default App;

import React from 'react';
import './App.css';
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import{Login, Task, Profile, AddTask, EditTask, EditProfile, SignUp} from "../src/pages/index"
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/task" element={<Task />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/add-task" element={<AddTask />} />
        <Route exact path="/edit-task/:id" element={<EditTask />} />
        <Route exact path="/edit-profile/:id" element={<EditProfile />} />
        <Route exact path="/sign-up" element={<SignUp />} />
    
      </Routes>
    </div>
  );
};

export default App;
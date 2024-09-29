import React, { useState, useEffect } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button } from '@mui/material';
import Graph from './Admin/Graph';
import GraphPercentage from './Admin/GraphPercentage';
import MyDatePicker from './Admin/Date';
import IndianTime from './Admin/IndianTime';
import UnitedStates from './Admin/UnitedStates';
import PersonIcon from '@mui/icons-material/Person';


function Admin() {
  const [show, setShow] = useState(true); // Not used currently
  const [todos, setTodos] = useState({}); // Stores todos for each user
  const [users, setUsers] = useState([]); // Stores users
  const [showUser, setShowUser] = useState({}); // Toggles visibility of todos for each user

  useEffect(() => {
    // Fetch all users
    const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
    setUsers(storedUsers);

    // Fetch todos for each user
    const fetchTodos = () => {
      const allTodos = {};
      storedUsers.forEach(user => {
        const userTodos = JSON.parse(localStorage.getItem(`todos_${user.email}`)) || [];
        allTodos[user.email] = userTodos;
      });
      setTodos(allTodos);
    };

    if (storedUsers.length > 0) {
      fetchTodos();
    }
  }, []);

  const handleShowTodos = (email) => {
    setShowUser(prevState => ({
      ...prevState,
      [email]: !prevState[email], // Toggle visibility
    }));
  };

  const deleteUser = (email) => {
    // Remove todos from localStorage
    localStorage.removeItem(`todos_${email}`);
    setTodos(prevTodos => {
      const updatedTodos = { ...prevTodos };
      delete updatedTodos[email];
      return updatedTodos;
    });

    // Remove user from localStorage
    const updatedUsers = JSON.parse(localStorage.getItem('user')) || [];
    const remainingUsers = updatedUsers.filter(user => user.email !== email);
    localStorage.setItem('user', JSON.stringify(remainingUsers));
    setUsers(remainingUsers);

    // Hide todos of deleted user
    setShowUser(prevState => ({
      ...prevState,
      [email]: false,
    }));
  };

  return (
    <div className="admin-container">
      <div className='admin'>
        <h2>ADMIN PANEL</h2>
        <div className="cards">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.email}>
                {/* Ensure user profile is shown even if showUser is undefined */}
                {showUser[user.email] !== undefined ? (
                  <>
                    {showUser[user.email] ? (
                      <div className="user-todos">
                        <h3>{user.email}</h3>
                        <div className="todos-list">
                          {todos[user.email] && todos[user.email].length > 0 ? (
                            todos[user.email].map((task, index) => (
                              <p key={index}>
                                {index + 1}. {task.text} 
                              </p>
                            ))
                          ) : (
                            <h4>No todos to show</h4>
                          )}
                        </div>
                        {/* Hide Todo Button */}
                        <div className="btns">
                        <Button size='small' variant="outlined" onClick={() => handleShowTodos(user.email)} startIcon={<ListAltIcon />}>
                          Hide Todo
                        </Button>
                        <Button size='small' sx={{marginLeft:'5px'}} variant="outlined" onClick={() => deleteUser(user.email)} startIcon={<ListAltIcon />}>
                          Delete User
                        </Button>
                        </div>
                        
                      </div>
                    ) : (
                      <div className="box-1">
                        <div className="icons">
                          {/* Add user icon here */}
                          <i className="fa fa-user" aria-hidden="true"></i> <PersonIcon color="primary"/>
                        </div>
                        <div className="user-name">
                          <h3>Name : {user.email}</h3>
                        </div>
                        <div className="btn">
                          <Button variant="contained" endIcon={<ListAltIcon />} onClick={() => handleShowTodos(user.email)}>
                            Show Todo
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // If showUser[user.email] is undefined, render the user profile with a default state
                  <div className="box-1">
                    <div className="icons">
                      {/* Add user icon here */}
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className="user-name">
                      <h2>Name : {user.email}</h2>
                    </div>
                    <div className="btn">
                      <Button variant="contained" endIcon={<ListAltIcon />} onClick={() => handleShowTodos(user.email)}>
                        Show Todo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h4 className='user'>No users found</h4>
          )}
        </div>
      </div>

      <div className="time-zone">
        <MyDatePicker />
        <IndianTime />
        <UnitedStates />
      </div>
      <div className="graphs">
        <Graph />
        <GraphPercentage />
      </div>
    </div>
  );
}

export default Admin;

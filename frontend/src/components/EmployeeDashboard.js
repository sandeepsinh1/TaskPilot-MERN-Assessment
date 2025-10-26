import React, { useContext } from 'react';
import TaskList from './TaskList';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';

export default function EmployeeDashboard() {
  const { tasks } = useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Employee Dashboard</h1>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.name || user?.email}</span>
          <button onClick={logout} style={{ padding: '8px 15px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      
      <hr />
      <TaskList tasks={tasks} isAdmin={false} />
    </div>
  );
}
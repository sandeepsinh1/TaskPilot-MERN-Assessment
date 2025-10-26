import React, { useContext, useState } from 'react';
import TaskList from './TaskList';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

const initialFormState = {
  title: '',
  description: '',
  assignedTo: '',
  status: 'To Do',
  dueDate: '',
};

export default function AdminDashboard() {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);
  const [taskForm, setTaskForm] = useState(initialFormState);

  const mockEmployees = [
    { _id: '60c72b2f9a7b9e0015f3f4e2', name: 'Employee One' },
    { _id: '60c72b2f9a7b9e0015f3f4e3', name: 'Employee Two' },
  ];

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', taskForm);
      alert('Task created successfully!');
      setTaskForm(initialFormState);
      fetchTasks();
    } catch (err) {
      alert(`Failed to create task: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: '20px' }}>
            Welcome, Admin: {user?.name || user?.email}
          </span>
          <button onClick={logout} style={{ padding: '8px 15px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      <hr />

      <h3>Create New Task</h3>
      <form
        onSubmit={handleCreateTask}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          gap: '10px',
          marginBottom: '30px',
        }}
      >
        <input name="title" placeholder="Title" value={taskForm.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={taskForm.description} onChange={handleChange} required />

        <select name="assignedTo" value={taskForm.assignedTo} onChange={handleChange} required>
          <option value="">Assign To...</option>
          {mockEmployees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        <select name="status" value={taskForm.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <input type="date" name="dueDate" value={taskForm.dueDate} onChange={handleChange} required />
        
        <button
          type="submit"
          style={{ backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Create Task
        </button>
      </form>

      {/* Pass safe tasks array */}
      <TaskList tasks={tasks || []} />
    </div>
  );
}

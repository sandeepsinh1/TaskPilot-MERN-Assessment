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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div>
          <span style={styles.welcome}>Welcome, {user?.name || user?.email}</span>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <section style={styles.card}>
        <h3 style={styles.sectionTitle}>Create New Task</h3>
        <form onSubmit={handleCreateTask} style={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={taskForm.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="description"
            placeholder="Description"
            value={taskForm.description}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="assignedTo"
            value={taskForm.assignedTo}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Assign To...</option>
            {mockEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={taskForm.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={taskForm.dueDate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.createBtn}>
            Create Task
          </button>
        </form>
      </section>

      <section style={styles.card}>
        <TaskList tasks={tasks || []} />
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f7f9fb',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
  },
  welcome: {
    marginRight: '15px',
    color: '#555',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '25px',
  },
  sectionTitle: {
    marginBottom: '15px',
    color: '#34495e',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  createBtn: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

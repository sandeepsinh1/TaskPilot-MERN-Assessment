import React, { useContext } from 'react';
import TaskList from './TaskList';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';

export default function EmployeeDashboard() {
  const { tasks } = useContext(TaskContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Employee Dashboard</h1>
        <div style={styles.userSection}>
          <span style={styles.welcome}>Welcome, {user?.name || user?.email}</span>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section style={styles.card}>
        <h3 style={styles.sectionTitle}>Your Tasks</h3>
        <p style={styles.subtext}>
          Here’s a list of tasks assigned to you. Stay focused and keep track of progress easily.
        </p>
        <TaskList tasks={tasks || []} isAdmin={false} />
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    color: '#2c3e50',
    letterSpacing: '0.5px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  welcome: {
    marginRight: '15px',
    fontSize: '15px',
    color: '#555',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s ease',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  },
  sectionTitle: {
    marginBottom: '10px',
    color: '#34495e',
    fontSize: '20px',
  },
  subtext: {
    color: '#777',
    fontSize: '14px',
    marginBottom: '20px',
  },
};

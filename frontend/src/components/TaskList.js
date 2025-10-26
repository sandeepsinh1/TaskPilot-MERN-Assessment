import React, { useContext } from 'react';
import API from '../api';
import { TaskContext } from '../context/TaskContext';

export default function TaskList({ tasks = [] }) {
  const { fetchTasks } = useContext(TaskContext);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
    }
  };

  if (!tasks.length)
    return (
      <p style={styles.emptyText}>
        No tasks available. You’re all caught up! 🎉
      </p>
    );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Tasks</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Title</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Due Date</th>
              <th style={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} style={styles.row}>
                <td style={styles.cell}>{t.title}</td>
                <td style={styles.statusCell}>
                  <span style={{ ...styles.statusBadge, ...statusColors[t.status] }}>
                    {t.status}
                  </span>
                </td>
                <td style={styles.cell}>
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}
                </td>
                <td style={styles.actionCell}>
                  <button
                    style={{ ...styles.button, backgroundColor: '#ffc107', color: '#333' }}
                    onClick={() => updateStatus(t._id, 'Pending')}
                  >
                    Pending
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: '#17a2b8' }}
                    onClick={() => updateStatus(t._id, 'In Progress')}
                  >
                    In Progress
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: '#28a745' }}
                    onClick={() => updateStatus(t._id, 'Completed')}
                  >
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Styles ---
const styles = {
  container: {
    marginTop: '10px',
  },
  title: {
    color: '#34495e',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  headerCell: {
    padding: '12px 10px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
  },
  row: {
    borderBottom: '1px solid #eee',
  },
  cell: {
    padding: '10px',
    fontSize: '14px',
    color: '#555',
  },
  statusCell: {
    padding: '10px',
  },
  statusBadge: {
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  actionCell: {
    padding: '10px',
  },
  button: {
    border: 'none',
    borderRadius: '5px',
    padding: '6px 10px',
    marginRight: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'opacity 0.2s ease',
  },
  emptyText: {
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
};

// --- Status Badge Colors ---
const statusColors = {
  'To Do': { backgroundColor: '#f0ad4e', color: 'white' },
  Pending: { backgroundColor: '#ffc107', color: '#333' },
  'In Progress': { backgroundColor: '#17a2b8', color: 'white' },
  Completed: { backgroundColor: '#28a745', color: 'white' },
  Done: { backgroundColor: '#28a745', color: 'white' },
};

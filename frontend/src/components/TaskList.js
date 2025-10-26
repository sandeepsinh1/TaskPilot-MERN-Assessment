import React, { useContext } from 'react';
import API from '../api';
import { TaskContext } from '../context/TaskContext';

export default function TaskList({ tasks = [] }) { // default empty array
  const { fetchTasks } = useContext(TaskContext);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
    }
  };

  if (!tasks.length) return <p>No tasks available.</p>; // safe fallback

  return (
    <div>
      <h3>Tasks</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</td>
              <td>
                <button onClick={() => updateStatus(t._id, 'Pending')}>Pending</button>
                <button onClick={() => updateStatus(t._id, 'In Progress')}>In Progress</button>
                <button onClick={() => updateStatus(t._id, 'Completed')}>Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

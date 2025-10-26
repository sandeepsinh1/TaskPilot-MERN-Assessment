import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) return {};
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.get('/tasks', getConfig());
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data?.message || err);
      setError(err.response?.data?.message || 'Failed to fetch tasks.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const updateTaskStatus = async (taskId, status) => {
    try {
      const res = await API.patch(`/tasks/${taskId}/status`, { status }, getConfig());
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: res.data.status } : task
        )
      );
      return res.data;
    } catch (err) {
      console.error('Error updating task status:', err);
      throw err;
    }
  };

  const contextValue = {
    tasks,
    loading,
    error,
    fetchTasks,
    updateTaskStatus,
    setTasks,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

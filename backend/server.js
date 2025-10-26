const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');   // must export router
const taskRoutes = require('./routes/taskRoutes');   // must export router
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);   // <-- must be a router
app.use('/api/tasks', taskRoutes);  // <-- must be a router

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

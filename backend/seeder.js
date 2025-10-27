// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Needed to hash passwords
const User = require('./models/User'); // Adjust path if necessary
const Task = require('./models/Task'); // Adjust path if necessary
const connectDB = require('./config/db'); // Your database connection function

dotenv.config();

// Connect to the database
connectDB(); 


const importData = async () => {
    try {
        // 1. Clear existing data
        await User.deleteMany();
        await Task.deleteMany();
        console.log('Existing data cleared.');

        // 2. Hash passwords
        const salt = await bcrypt.genSalt(10);
        adminUserData.password = await bcrypt.hash(adminUserData.password, salt);
        employeeUserData.password = await bcrypt.hash(employeeUserData.password, salt);

        // 3. Create Users
        const createdAdmin = await User.create(adminUserData);
        const createdEmployee = await User.create(employeeUserData);
        console.log('Users created: Admin and Employee.');

        // 4. Create Tasks assigned to the Employee
        const sampleTasks = [
            {
                title: 'Develop Employee Dashboard',
                description: 'Implement the UI and functionality for the Employee Dashboard as per requirements.',
                // FIX APPLIED: Changed 'assignedEmployee' to 'assignedTo'
                assignedTo: createdEmployee._id, 
                status: 'In Progress',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
            {
                title: 'API Integration for Task List',
                description: 'Connect the TaskList component to the backend API to fetch tasks.',
                //FIX APPLIED: Changed 'assignedEmployee' to 'assignedTo'
                assignedTo: createdEmployee._id,
                status: 'Pending',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            },
            {
                title: 'Review Admin Reports',
                description: 'Check the database for task summary data.',
                //FIX APPLIED: Changed 'assignedEmployee' to 'assignedTo'
                assignedTo: createdAdmin._id, // Assign a task to Admin (optional)
                status: 'Completed',
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
            },
        ];

        await Task.insertMany(sampleTasks);
        console.log('Sample tasks created and assigned.');

        console.log(' Data Imported Successfully!');
        process.exit();

    } catch (error) {
        console.error(` Error with data import: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Task.deleteMany();
        console.log('🗑️ Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data destroy: ${error.message}`);
        process.exit(1);
    }
};

// Use command line arguments to choose action
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
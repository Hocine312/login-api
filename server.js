const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cors({ origin:['http://localhost:5173', 'https://react-vote-diploy.vercel.app'], credentials:true })); // Adjust the origin as needed


// Connect to Database
console.log('Connecting to the database...');
connectDB();
console.log('Database connection initiated');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// HEALTH CHECK
app.get('/health', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)
);
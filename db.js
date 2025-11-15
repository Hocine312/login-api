const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://hocinedr_db_user:5r5sgeBIjZxTJRw0@cluster0.vwby9px.mongodb.net/?appName=Cluster0', {
            
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
module.exports = connectDB;
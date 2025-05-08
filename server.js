const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/projects',require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/activitylogs', require('./routes/activityLogRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/attachment', require('./routes/attachmentRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

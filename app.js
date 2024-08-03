const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

require('./models/user');
require('./models/folder');
require('./models/file');

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/files', fileRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => { 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

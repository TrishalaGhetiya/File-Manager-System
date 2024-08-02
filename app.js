const express = require('express');
require('dotenv').config();
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

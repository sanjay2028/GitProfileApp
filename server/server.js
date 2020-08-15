/**
 * Author : Sanjay Kumar (Sanjay2028@gmail.com)
 * Date : 15th Aug, 2020
 * Purpose : Main file for server end
 */
'use-strict';
 
/**
 * Default Imports
 */
const express = require("express");
const CORS = require("cors");
const bodyParser = require('body-parser');
const path = require("path");

/**
 * Load environemnt variables
 */
require('dotenv').config();
const PORT = process.env.PORT
const createDBConnection = require('./utilities/db');

/**
 * Main App
*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(CORS());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Import routes
 */
const gitRoutes = require('./routes');

/**
 * Register API Routes
 */
app.use('/api', gitRoutes);

// const User = require('./config/user');
// const db = require('./config/db');
// const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");






// app.use('/api/admin/user', userRoutes);
// app.use('/api/auth', authRoutes);

app.listen(PORT, async (req, res) =>{
    try{
        let db_resp = await createDBConnection();        
        console.log("Listening at Port No. %s", PORT)
    } catch(error) {
        console.log("Error", error.toString())     
    }
});
// Setup empty JS object to act as endpoint for all routes
projectData = {};
const posts = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
	console.log("server running");
    console.log(`Running Server at port ${port}`)
}

app.get('/projectData' , (req, res) => {
    res.send(projectData)
    console.log(projectData);
});

app.post('/projectData' , (req, res) => {
    console.log(req.body);
    projectData = req.body;
    posts.push(req.body);
    console.log(posts);
});
// This is the employee controller

// Import router package
const router = require('express').Router();
const employeeService = require('../services/employeeService');


// This endpoint will return all employee data from the database
router.get('/', async(req, res) => {

    // set content type of response body in the headers
    // As this is defined globally in app.js it can be ommitted from here
    res.setHeader('Content-Type', 'application/json');

    const result = await employeeService.getEmployees();

    // Send a  response - this app will be a web api so no need to send HTML
    res.json(result);

});

// This endpoint will return a single employee by id
// The endpoint is same as for / but with an added :id parameter
router.get('/:id', async(req, res) => {

    // Try to get data and return
    try {
        // Get result from the employee service
        // passing the value from req.params.id
        const result = await employeeService.getEmployeeById(req.params.id);

        // Send a  response
        res.json(result);

    // Handle server errors    
    } catch (err) {
      console.log('GET employee/:id - ', err.message);

      res.sendStatus(500);  
    }
});


// Endpoint to handle requests for employee by id
// req.query version
// req format: /employee/bycat/4
//
router.get("/bycat/:deptId", async (req, res) => {
    // read values from req

    // Get employees 
    try {
      const result = await employeeService.getEmployeesByDeptId(req.params.deptId);
  
      // Send response back to client
      res.json(result);
  
      // Catch and send errors
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  });


  // This endpoint is used to add a new employee
// Note that this handles a POST request (router.post)
router.post('/', async(req, res) => {

    // read data request body, this will be the new employee
    const new_employee = req.body;
    
    // If data missing return 400
    if (typeof new_employee === "undefined") {
      res.statusMessage = "Bad Request - missing employee data";
      res.status(400).json({ content: "error" });
      return 1;
    }
    // log the data to the console
    console.log(`employee data sent:\n ${JSON.stringify(new_employee)}`);
  
    // Call employeeService to create the new employee
    try {
      const result = await employeeService.addNewEmployee(new_employee);
  
      // Send response back to client
      res.json(result);
  
      // Catch and send errors
    } catch (err) {
      console.log('POST employee/ - ', err.message);
      res.sendStatus(500);  
    }
  
  });



// export
module.exports = router;

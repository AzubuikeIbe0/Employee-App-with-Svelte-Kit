//
// Functions for validating employees
//

// for documentation see: https://www.npmjs.com/package/validator
const validator = require('validator');

// Import existing validateId function from baseValidators.
const { validateId } = require('./baseValidators');

// Import employee object model
const Employee = require('../models/employee');

// Validate the body data, sent by the client, for a new employee
// employee represents the data filled in a form
// It needs to be validated before using in the application
function validateNewEmployee(employee) {

    // Declare constants and variables
    let validated_employee;

    // debug to console - if no data
    if (employee === null) {
        console.log('validateNewEmployee(): Parameter is null');
    }
    // Validate form data for new employee fields
    // Creating a employee does not need a employee id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (

      
        validateId(employee.department_id) && 
        !validator.isEmpty(employee.first_name) && 
        !validator.isEmpty(employee.last_name) && 
        !validator.isEmpty(employee.email) && 
        !validator.isEmpty(employee.job_title) && 
        !validator.isEmpty(employee.start_date) && 
        validator.isCurrency(employee.salary+ '', { no_symbols: true, allow_negatives: false }))
    {
        // Validation passed
        // create a new employee instance based on employee model object
        // no value for employee id (passed as null)
        validated_employee = new Employee(
                0, // New employee as no id
                employee.department_id,
                // escape is to sanitize - it removes/ encodes any html tags
                validator.escape(employee.first_name),
                validator.escape(employee.last_name),
                validator.escape(employee.email),
                validator.escape(employee.job_title),
                employee.start_date,
                employee.salary
            );
    } else {
        // debug
        console.log("validateNewEmployee(): Validation failed");
    }
    // return new validated employee object

    return validated_employee;
}


// Module exports
// expose these functions
module.exports = {
  validateNewEmployee
}
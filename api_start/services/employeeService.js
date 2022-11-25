// Employee service functions

const employeeData = require('../dataAccess/employeeData');

// Import dependencies

// Validation
const validate = require('../validators/baseValidators');
const employeeValidator = require('../validators/employeeValidator');

// Function to get all employees
//
async function getEmployees() {
    
    // a place holder for now 
    const employees = await employeeData.getEmployees();
  
    // return employees
    return employees;
  }
  

// Function to get employee by id
//
async function getEmployeeById(id) {
  // validate the id
  const validated_id = validate.validateId(id);

  if (validated_id) {
    // Call the data access function to get employee with matching id
    const employee = await employeeData.getEmployeeById(validated_id);

    // return the employee
    return employee;
  } else {
    return "get employee by id service - Invalid employee id";
  }
}

// Function to get employees in a specified category (by category id)
//
async function getEmployeesByDeptId(id) {

    // validate the id
    const validated_id = validate.validateId(id);
  if (validated_id) {

    // Call the data access function to get employee matching id
    const employees = await employeeData.getEmployeesByDeptId(validated_id);

    // return the employees found
    return employees;

  } else {
      return "get by cat service - Invalid employee id";
  }
}

// This function accepts employee data which it validates.
// If validation passes then pass the new employee data to the data access layer
async function addNewEmployee(employee_data) {

  // declare variables
  let result;

    // Call the employee validator - kept seperate to avoid clutter here
    let validated_employee = employeeValidator.validateNewEmployee(employee_data); 

    // If validation returned a employee object - save to database
    if (validated_employee) {
      // Insert
      result = await employeeData.createEmployee(validated_employee);

      return {
        employee: result,
        message: `employee added with id: ${result.id}`
      }
    
    } else {
      return {
        employee: employee_data,
        message: 'add employee service - invalid employee data'
      }
    }
}



// Module exports
// expose these functions
module.exports = {
    getEmployees,
    getEmployeeById,
    getEmployeesByDeptId,
    addNewEmployee,
};



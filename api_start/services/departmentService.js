// Category service functions

const departmentData = require('../dataAccess/departmentData');

// Function to get all departments
//
async function getDepartments() {
    
    // a place holder for now 
    const departments = await departmentData.getDepartments();
  
    // return departments
    return departments;
  }
  
// Module exports
// expose these functions
module.exports = {
    getDepartments
};
// Data access functions for employees

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all employees from DB
// https://www.prisma.io/client
async function getEmployees() {
    // define variable to store employees
    let employees;

    try {  
        // Get all employees
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        employees = await prisma.employee.findMany({
                orderBy: {first_name: 'asc'}

    });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get employees: ', err.message);
    } finally {

    }
    return employees;
}


// Get employee by id from DB
//
async function getEmployeeById(id) {

    // Define variable
    let employee;

    try {
        // use where with findUnique
        employee = await prisma.employee.findUnique ({
            where: {id: id}
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get employee by id: ', err.message);
    } finally {
        // later
    }
    // return a single employee if found
    return employee;
}

// Get employees from DB by dept id
//
async function getEmployeesByDeptId(deptId) {

    // define variable to store employees returned
    let employees;

    // execute the query to find employees
    try {
        // find all employees
        employees = await prisma.employee.findMany ({
            // where department_id = dept_id
            where: {department_id: deptId},
            orderBy: {last_name: 'asc'} 
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get employees by department: ', err.message);
    } finally {
        // later
    }
    // return all employees found
    return employees;
}

// Insert a new employee into the database
// Return the result
//
async function createEmployee(employee) {
    let new_employee;

    // execute query using prisma.employee.create
    // Note the data object
    try {
        // New employee so no id
        new_employee = await prisma.employee.create({
            data: {
                department_id: Number(employee.department_id), 
                first_name: employee.first_name,
                last_name: employee.first_name, 
                email: employee.email,
                job_title: employee.job_title,
                start_date: employee.start_date,
                salary: Number(employee.salary)
            }
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - create employee: ', err.message);
    } finally {

    }
    // return the new employee
    return new_employee;
}



// Export 
module.exports = {
    getEmployees,
    getEmployeeById,
    getEmployeesByDeptId,
    createEmployee,
};
// Data access functions for departments

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all departments from DB
//
async function getDepartments() {
    // define variable to store departments
    let departments;

    try {  
        // Get all departments
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        departments = await prisma.department.findMany();

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all departments: ', err.message);
    } finally {

    }
    // return all departments found
    return departments;
}


// Export 
module.exports = {
    getDepartments
};
import { writable } from 'svelte/store';


// .env variables starting with VITE_ are accessible client and server side 
const base_url = import.meta.env.VITE_API_BASE_URL

// declare writable stores for employees and departments
export let employees = writable([]);
export let departments = writable([]);


//
// Used to Initialise  requests
// parameters: http method and body content note default values)
const initRequest = (http_method = 'GET', body_data = '') => {

    let request = {
        method: http_method,
        //credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            //,"Authorization": "Bearer " + getAccessToken()
        },
        mode: 'cors',
        cache: 'default',
    };

    if (body_data) {
        request.body = body_data;
    }

    return request;
};


// Function to fetch and return data from an API
// Full URI based on base_url + endpoint
const getAPIData = async (endpoint = '', request = initRequest()) => {
    try {
        const response = await fetch(`${base_url}${endpoint}`, request);
        const data = await response.json();
        return data;

    } catch (err) {
        console.log('API error (store) ', err.message);
    } finally {

    }
};

// Function to get all employees from the api
// sets the employees store
export const getAllEmployees = async () => {

    const data = await getAPIData('/employee');
    employees.set(data);
};

// Function to get all departments from the api
// sets the departments store
export const getAllDepartments= async () => {

    const data = await getAPIData('/department');
    departments.set(data);     

};


// Function to get employees in a category (by category id)
// sets the employees store
export const getEmployeesByDept= async (dept_id = 0) => {

    // 
    if (dept_id > 0) {
        const data = await getAPIData(`/employee/bydept/${dept_id}`);
        departments.set(data);
    } else {
        getAllEmployees();
    }

};


// Add a new product by sending a POST request to the API
export const addNewEmployee= async (employee = '') => {

    if (employee) {
        // build the request using the intRequest function
        const request = initRequest('POST', employee);

        // Make th request via getAPIData() function
        const result = await getAPIData('/employee', request);

        // refresh the store
        getAllEmployees();

        // return the API result
        return result;

      // In case of error  
    } else {
        console.log('Store: Add new employee failed: missing employee');
    }
}






  // fill the store
  //await getAllEmployees();
  //await getAllDepartments();

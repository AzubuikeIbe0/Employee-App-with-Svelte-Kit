// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the addNewProduct() function from the product store.
import { addNewEmployee } from '../../stores/employeeStore.js';

// The form action handler(s)
export const actions = {

    // action function for adding a product - called when form is submitted
    // This is where the form sends its data
    addemployee: async ({request }) => {
      let success = false;

      // get data from the POST request
      const form_data = await request.formData();

      // read each value from the submitted form
      const employee = {
        department_id: Number(form_data.get('department_id')),
        first_name: form_data.get('first_name'),
        last_name: form_data.get('last_name'),
        email: form_data.get('email'),
        job_title: form_data.get('job_title'),
        start_date: form_data.get('start_date'),
        salary: Number(form_data.get('salary'))
    }
  

      // Basic validation
      if (employee.department_id > 0 &&
          employee.first_name != '' &&
          employee.last_name != '' &&
          employee.email != '' &&
          employee.job_title != '' &&
          employee.start_date != '' &&
          employee.salary > 0 
      ) {
          // Add the new employee via the API (using the employee store function)
          const result = await addNewEmployee(JSON.stringify(employee));
          console.log('add employee result: ', result)

        // return the result
        // This will display the success section of the page to show the newly added employee
        return { 
          success: true,
          message: `New employee added with id: ${result.employee.id}`,
          employee: result.employee
        };

        // This will cause the form to redisplay for corrections, along with an error message
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          employee: employee
        })
      }
    }

  };

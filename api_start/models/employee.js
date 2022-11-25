// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters

function Employee(id = 'undefined', cat = 'undefined', fname, lname, email, job_title, start_date, salary) {

    this.id = Number(id);
    this.department_id  = Number(cat);
    this.first_name = fname;
    this.last_name =lname;
    this.email = email;
    this.job_title = job_title;
    this.start_date = start_date;
    this.salary = Number(salary);
}

module.exports = Employee;
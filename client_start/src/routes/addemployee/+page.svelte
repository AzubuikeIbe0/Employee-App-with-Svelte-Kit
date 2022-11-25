 <script>
// @ts-nocheck


	// import required Sveltekit form features
	import { enhance, applyAction } from '$app/forms';

	// Import the store etc.
	import { departments, getAllDepartments} from '../../stores/employeeStore.js';
	export let data;
	export let form;

	// Refresh the store when page loads (optional due to overhead but probably a good idea)
	export const load = async ({ fetch }) => {
		// Update list of categories (used in form)
		await getAllDepartments();
		return {
		}
	}
</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<!-- If the insert was sucessfull display the new product details-->
	<!-- the form data is returned by the server script for this page-->
	{#if form?.success}

		<div class="row">
			<!-- Page Header -->
			<!-- show form message if it exists-->
			<h2 class="mt-5">{form?.message || ''}</h2>
		</div>

		<div class="row">
			<div class="row mb-3">
				<h6>Employee ID: {form?.employee.id || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Department: {form?.employee.department_id || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>First Name: {form?.employee.first_name || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Last Name: {form?.employee.last_name || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Email: {form?.employee.email || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Job Title: {form?.employee.job_title || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Start Date: {form?.employee.start_date || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Salary: {form?.employee.salary || ''}</h6>
			</div>
		</div>
	<!-- else show the form again (very simple error handling - should also show validation errors)-->
	{:else}
		<div class="row">
			<!-- Page Header -->
			<h2 class="mt-5">Add Employee</h2>
		</div>

		<div class="row">
			<!-- Employee Form -->
			<form
			 	method="POST" 
			 	action="?/addemployee"
				 use:enhance={({ form }) => {
					// Before form submission to server
					return async ({ result, update }) => {
						// After form submission to server
						if (result.type === 'success') {
							await applyAction(result);
						}
						if (result.type === 'invalid') {
							await applyAction(result);
						}
						update();
					};
				}}
			 >
				<div class="row mb-3">
					<label for="category_id" class="form-label">Department:</label>
					<div class="col-sm-8">
						<select id="department_id" class="form-select" name="department_id">
							<option value="0">Choose a department</option>
                            <!-- Add each department as an option in the seclect -->
							{#each $departments as cat}
								<option value={cat.id}>{cat.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row mb-3">
					<label for="employee_fname" class="form-label">First Name:</label>
					<div class="col-sm-8">
						<input 
							id="employee_fname" 
							type="text" 
							class="form-control" 
							name="employee_fname" 
							value="{form?.employee.first_name || ''}"
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="employee_lname" class="form-label">Last Name:</label>
					<div class="col-sm-8">
						<input 
							id="employee_lname" 
							type="text" 
							class="form-control" 
							name="employee_lname" 
							value="{form?.employee.last_name || ''}"
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="email" class="form-label">Email:</label>
					<div class="col-sm-8">
						<input
						id="email"
						type="text"
						class="form-control"
						name="email"
						value="{form?.employee.email || ''}"
					/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="job_title" class="form-label">Job Title:</label>
					<div class="col-sm-8">
						<input
						id="job_title"
						type="text"
						class="form-control"
						name="job_title"
						value="{form?.employee.job_title || ''}"
					/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="start_date" class="form-label">Start Date:</label>
					<div class="col-sm-8">
						<input 
							id="start_date" 
							type="number" 
							class="form-control" 
							name="start_date" 
							value="{form?.employee.start_date || ''}" 
						/>
					</div>
				</div>
				<div class="row mb-3">
					<label for="salary" class="form-label">Salary:</label>
					<div class="col-sm-8">
						<input
							id="salary"
							type="number"
							min="0.00"
							max="10000.00"
							step="0.01"
							class="form-control"
							name="salary"
							value="{form?.employee.salary || ''}"
						/>
					</div>
				</div>
				<!-- employeeId is a hidden field value is not required but set = 0-->
				<input id="id" type="hidden" value="0" />
				<div class="mb-3">
					<button type="submit" class="btn btn-primary"> Add Employee </button>
					<a href="/" class="btn btn-secondary"> Cancel </a>
				</div>

				{#if form?.error}
					<div class="alert alert-danger col-sm-8" role="alert">validation failed: {form?.message}</div>
				{/if}
			</form>
			<!-- End form-->
		</div>
	{/if} <!-- End the if block-->
</div> 

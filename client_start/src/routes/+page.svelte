<script>
// @ts-nocheck

	// Import the store etc.
	import { employees, departments, getAllEmployees } from '../stores/employeeStore.js';

	import { browser } from '$app/environment';


	$: filtered = $employees;





	// This function will filter products by cat_id
	const filterByCat = async (cat_id = 0) => {
		// Refresh the store to ensure it is up to date (optional)
		await getAllEmployees();

		// Filter if we have a cat_id value > 0
		// See https://javascript.info/array-methods#filter
		// Note this filters the existing $product store and does not replace it like getProductsByCat()
		if (cat_id > 0) {
			filtered = $employees.filter((p) => {
				return p.department_id == cat_id;
			});
		}
	};

</script>

<!-- Main Content - Employees etc. -->
<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Employees List</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="departmentList" class="list-group">
				<!-- placeholders - replace with real department links -->
			
					<button on:click={() => filterByCat()} class="department-link list-group-item list-group-item-action">
						All Departments
					</button>
					{#each $departments as cat}
					<button
						on:click={() => filterByCat(cat.id)}
						class="category-link list-group-item list-group-item-action"
					>
						{cat.name}
					</button>
				{/each}
				<!-- {/each} -->
			</div>
		</div>
		<!-- End department col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->
			<div id="employees">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><a href="/">id</a></th>
							<th><a href="/">last name</a></th>
							<th><a href="/">first name</a></th>
							<th><a href="/">email</a></th>
							<th><a href="/">job title</a></th>
							<th><a href="/">start date</a></th>
							<th><a href="/">salary</a></th>
						</tr>
					</thead>
					<tbody id="employeeRows">
						<!-- Employee Rows to be inserted here -->
						{#each filtered as employee}
							<tr>
								<td>{employee.id}</td>
								<td>{employee.last_name}</td>
								<td>{employee.first_name}</td>
								<td>{employee.email}</td>
								<td>{employee.job_title}</td>
								<td>{employee.start_date}</td>
								<td>&euro;{Number(employee.salary)}</td>
							</tr>
						{/each} 
					</tbody>
				</table>
			</div>
			<!-- Add employee button goes here -->
			<a id="AddEmployeeButton" class="btn btn-primary" href="/addemployee" role="button">New Product</a>
		</div>
		<!-- End Employee col -->
	</div>
	<!-- End Row -->
</div>

<!-- End Main Content-->
<style>
</style>

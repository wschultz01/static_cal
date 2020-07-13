let globalTotal = 0;
let globalEmployees = [];
let dom_id = 0;

$(document).ready(onReady);

function onReady() {
	$('form').submit(function (event) {
		addEmployee();
	});
	$('.addEmployee').on('click', deleteEmployee);
}

function addEmployee() {
	let fname = $('#fname').val();
	let lname = $('#lname').val();
	let id = $('#id').val();
	let title = $('#title').val();
	let annual_salary = $('#AnnualSalary').val();

	let employee = {
		first_name: fname,
		last_name: lname,
		emp_id: id,
		emp_title: title,
		a_salary: annual_salary,
		dom_id: dom_id++,
	};

	globalEmployees.push(employee);
	globalTotal += Number(annual_salary) / 12;
	searchEmployees();
	displaySalary();
	$('form')[0].reset();
	event.preventDefault();
}

function searchEmployees() {
	$('.addEmployee').empty();
	for (let i = 0; i < globalEmployees.length; i++) {
		$('.addEmployee').append(
			'<tr><td>' +
				globalEmployees[i].first_name +
				'</td><td>' +
				globalEmployees[i].last_name +
				'</td><td>' +
				globalEmployees[i].emp_id +
				'</td><td>' +
				globalEmployees[i].emp_title +
				'</td><td id="' +
				globalEmployees[i].dom_id +
				'" class="a_salary">' +
				parseFloat(globalEmployees[i].a_salary).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				}) +
				'</td><td><button type="button" class="delete">Delete</button</td></tr>'
		);
	}
	return true;
}

function displaySalary() {
	let number = parseFloat(globalTotal).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	$('#total').html(number);
	if (globalTotal > 20000) {
		$('#total').css('color', 'red');
	} else {
		$('#total').css('color', 'black');
	}
	if (globalTotal > 0) {
		$('table').css('empty-cells', 'show');
	} else {
		$('table').css('empty-cells', 'hide');
	}
}

function deleteEmployee() {
	let currency = $(event.target).closest('tr').find('.a_salary').html();
	remove = Number(currency.replace(/[^0-9.-]+/g, ''));
	let remove_emp = $(event.target).closest('tr').find('.a_salary').attr('id');
	globalTotal -= remove / 12;
	removeGlobalEmployee(remove_emp);
	$(event.target).closest('tr').remove();
	displaySalary();
}

function removeGlobalEmployee(comp) {
	for (let i = 0; i < globalEmployees.length; i++) {
		if (globalEmployees[i].dom_id === Number(comp)) {
			globalEmployees.splice(i, 1);
		}
	}
	return false;
}

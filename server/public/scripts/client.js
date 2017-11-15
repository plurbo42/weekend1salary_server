//TO DO:
// Add 'remove' button to each ee, instead of just removing last ee

console.log('js sourced');

$(document).ready(onReady);

function onReady() {
    $('#inputlist').on('click', '#newEmployeeButton', submitNewEmployee);
    $('#employeeTable').on('click', '.removeButton', removeEmployee);
    calculateCosts();
}

var employeeArray = [];

function Employee(firstName, lastName, employeeID, jobTitle, annualSalary) {
    this.firstName = $('#firstNameInput').val();
    this.lastName = $('#lastNameInput').val();
    this.employeeID = $('#employeeIDInput').val();
    this.jobTitle = $('#jobTitleInput').val();
    this.annualSalary = Number($('#annualSalaryInput').val().replace(/,|\$/g, '')); //replace to account for non-numeric money input
}

function submitNewEmployee() {
    console.log('in new employee')
    if ($('#annualSalaryInput').val() == '') {
        alert('Please complete Annual Salary field');
        return;
    } //error handling for blank salary

    var newEmployee = new Employee();

    if (isNaN(newEmployee.annualSalary)) {
        alert('Please enter numeric value for Annual Salary')
        $('#annualSalaryInput').val('');
        return;
    } //error handling for non-numeric salary

    employeeArray.push(newEmployee);
    console.log(employeeArray);

    appendTable(); //add employees to table
  
    calculateCosts(); //calculate gross wages

    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#employeeIDInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');
    //input cleared
}// end submit new employee 

function removeEmployee() {
    console.log('in removeEmployee')
    $(this).parent().parent().remove();
    var removeIndex = $(this).data('index');
    console.log('remove index is ', removeIndex);
    employeeArray.splice(removeIndex, 1);
    console.log(employeeArray);
    calculateCosts();
    appendTable();
}

function calculateCosts() {
    var yearlyCost = 0;
    for (var i = 0; i < employeeArray.length; i++) {
        var currentEmployee = employeeArray[i];
        yearlyCost = yearlyCost + employeeArray[i].annualSalary;
    }
    var monthlyCost = (yearlyCost / 12).toFixed(2);
    console.log(yearlyCost + ' is the yearly cost ' + monthlyCost + ' is the monthly cost')
    $('#calculations').replaceWith('<p id="calculations">Total monthly gross wages: $' + monthlyCost + '</p>')
}

function appendTable(){
    $('#employeeTable').empty(); //clear out employee table, otherwise buttons will be incorrectly associated with indices
        for (var i = 0; i < employeeArray.length; i++) {
            $('#employeeTable').append(
                '<tr>' +
                '<td class="firstName">' + employeeArray[i].firstName + '</td>' +
                '<td class="lastName">' + employeeArray[i].lastName + '</td>' +
                '<td class="employeeID">' + employeeArray[i].employeeID + '</td>' +
                '<td class="jobTitle">' + employeeArray[i].jobTitle + '</td>' +
                '<td class="annualSalary">$' + employeeArray[i].annualSalary + '</td>' +
                '<td><button class="removeButton" data-index="' + i + '">Remove Employee</button></td>' +
                '</tr>')
        }
}
var employees = [];
var frozenEmployees = [];

$(document).ready(function(){
    getData();

    $('#peopleContainer').on('click', '#delete', deletePerson);
    $('#peopleContainer').on('click', '#freeze', freezePerson);

});

function deletePerson() {
    employee =[];
    var deletedPerson = {};
  deletedPerson.id = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/data',
    data: deletedPerson,
    success: function (data) {
        getData();
    }
  });
}

function getData() {
    $.ajax({
    type: 'GET',
    url: '/data',
    //data
    success: function (data) {
      employees = data;
      appendToDom();
        //keepFrozen();
      displayTotals();
    }
  });
}

function appendToDom() {
    $("#peopleContainer").empty();
    for (var i = 0; i < employees.length; i++) {
    $('#peopleContainer').append('<div class="row">' +
    '<p class="individual col-md-2">First Name: ' + employees[i].firstName + '</p>' +
         '<p class="individual col-md-2">Last Name:' + employees[i].lastName + '</p>' +
         '<p class="individual col-md-2">Salary: ' + employees[i].salary + '</p>' +
         '<p class="individual col-md-2">Years of Service: ' + employees[i].yearsService + '</p>' +
         '<button id = "delete" class="btn btn-danger col-md-1" data-id="'+employees[i]._id + '"> Delete </p>' +
        '<button id = "freeze" class="btn btn-danger col-md-1" data-id="'+employees[i]._id + '"> Freeze </p>'+
      '</div>');

  }

}

function totalSalary(){
   var salaryTotal = 0;
    for (var i = 0; i < employees.length; i++){
       salaryTotal+= parseInt(employees[i].salary);
    }
    return salaryTotal;
}

function averageSalary(){
    return (totalSalary()/employees.length);
}

function totalYears(){
    var yearsTotal = 0;
    for (var i = 0; i < employees.length; i++){
        yearsTotal += parseInt(employees[i].yearsService);
    }
    return yearsTotal;
}

function averageYears(){

    return (Math.round((totalYears()/employees.length)*100))/100;

}

function displayTotals(){
    $('#salaryAverage').text(averageSalary());
    $('#salaryTotal').text(totalSalary());
    $('#serviceAverage').text(averageYears());
    $('#yearsTotal').text(totalYears());


}

function freezePerson() {
    for (var i = 0; i < employees.length; i++) {
        if (employees[i]._id === $(this).data('id')) {
            frozenEmployees.push(employees.splice(i, 1));
            displayTotals();
        }
    }
}

//Could not get function too work. There was a bug that made it so that a frozen employee would reset when the delete button was clicked.

//function keepFrozen(){
//    for(var i = 0; i < frozenEmployees.length; i++){
//        for(var j = 0 ; j < employees.length; i++) {
//            if (frozenEmployees[i] == employees[j]._id) {
//                employees.splice(i, 1);
//                return console.log(frozenEmployees);
//            }
//        }
//    }
//}

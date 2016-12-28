var app = angular.module('sumoLogic', []);

app.controller('AppController', ['$scope', function ($scope) {
    var i;

    $scope.currentSelection = {
        shouldSendWelcomeEmail: false,
        selectedTeam: '',
        selectedEmployee: ''
    };

    $scope.data = [
        {team: 'Engineering', employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']},
        {team: 'Executive', employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']},
        {team: 'Finance', employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']},
        {team: 'Sales', employees: ['Ankit Jain', 'Anjali Maulingkar']}
    ];

    $scope.teamsList = [];

    for (i = 0; i < $scope.data.length; i++) {
        $scope.teamsList.push($scope.data[i].team);
    }

    $scope.getEmployeesList = function () {
        if ($scope.currentSelection.selectedTeam) {
            for (i = 0; i < $scope.data.length; i++) {
                if ($scope.data[i].team === $scope.currentSelection.selectedTeam) {
                    return $scope.data[i].employees;
                }
            }
        }

        $scope.currentSelection.selectedEmployee = '';
    };

    $scope.onCloseButtonClick = function () {
        confirm('Are you sure to want to close?');
    };

    $scope.onFormSubmit = function () {
        if ($scope.employeeWelcomeForm.$valid) {
            console.log($scope.shouldSendWelcomeEmail, $scope.currentSelection.selectedTeam, $scope.currentSelection.selectedEmployee);
            alert('Success');
        }
    };
}]);
app.directive('sumoLogicAutoComplete', ['$compile', '$timeout', function ($compile, $timeout) {
    return {
        restrict: 'A',
        require: '^ngModel',
        scope: {
            ngModel: '=',
            optionsList: '=?',
            validationKey: '=?'
        },
        compile: function (el) {
            var dropDownEl = document.createElement('ul');
            dropDownEl.className = 'dropdown hidden';

            dropDownEl.innerHTML = '<li ng-repeat="option in filteredOptionsList track by $index" ' +
                'ng-click="onOptionSelect(option)" ng-mouseover="settings.currentSelectedOption = $index;" ' +
                'ng-class="{selected: settings.currentSelectedOption === $index}">{{option}}</li>';

            el.after(dropDownEl);

            var compiledEl = $compile(dropDownEl);
            var $dropdown = angular.element(dropDownEl);

            return function link(scope, element, attrs, ngModel) {
                compiledEl(scope);

                scope.settings = {};
                scope.settings.currentSelectedOption = '';

                scope.validateField = function () {
                    return scope.optionsList && scope.optionsList.indexOf(scope.ngModel) >= 0;
                };

                scope.setValidity = function () {
                    ngModel.$setValidity(attrs.validationKey, scope.validateField() || false);
                };

                scope.toggleDropDown = function (show) {
                    if (show) {
                        scope.settings.placeholder = scope.settings.placeholder || el[0].getAttribute('placeholder');

                        el[0].style.backgroundColor = 'white';
                        el[0].setAttribute('placeholder', '');

                        $dropdown.removeClass('hidden');
                    } else {
                        el[0].style.backgroundColor = '#d7d8d8';
                        el[0].setAttribute('placeholder', scope.settings.placeholder);
                        $dropdown.addClass('hidden');
                    }
                };

                scope.onOptionSelect = function (selectedOption) {
                    scope.ngModel = selectedOption;
                    scope.setValidity();
                    scope.toggleDropDown();
                };

                // Watchers
                scope.$watch('ngModel', function (model) {
                    if (scope.optionsList && scope.optionsList.length) {
                        scope.filteredOptionsList = scope.optionsList.filter(function (option) {
                            return option.toLowerCase().indexOf(model.toLowerCase()) === 0;
                        });
                    }

                    scope.settings.currentSelectedOption = 0;
                });

                scope.$watch('optionsList', function (optionsList) {
                    if (optionsList && optionsList.length) {
                        scope.filteredOptionsList = optionsList;
                    }
                });

                // Events
                el.on('click', function () {
                    scope.toggleDropDown(true);
                });

                el.on('blur', function () {
                    $timeout(function () {
                        scope.toggleDropDown();
                    }, 500);
                });

                angular.element(el[0].form).on('submit', function () {
                    scope.setValidity();
                });
            };
        }
    };
}]);
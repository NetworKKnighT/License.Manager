﻿var app =
    angular.module('license-manager', ['http-auth-interceptor', 'AuthServices', 'CustomerServices', 'ProductServices', 'LicenseServices']).
        config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider.
                    when('/customers/add', { templateUrl: 'partials/customer-add.html', controller: CustomerAddCtrl }).
                    when('/customers', { templateUrl: 'partials/customer-list.html', controller: CustomerListCtrl }).
                    when('/customers/:id', { templateUrl: 'partials/customer-detail.html', controller: CustomerDetailsCtrl }).
                    when('/products/add', { templateUrl: 'partials/product-add.html', controller: ProductAddCtrl }).
                    when('/products', { templateUrl: 'partials/product-list.html', controller: ProductListCtrl }).
                    when('/products/:id', { templateUrl: 'partials/product-detail.html', controller: ProductDetailsCtrl }).
                    when('/products/:productId/licenses', { templateUrl: 'partials/license-list.html', controller: LicenseListCtrl }).
                    when('/products/:productId/licenses/add', { templateUrl: 'partials/license-add.html', controller: LicenseAddCtrl }).
                    when('/products/:productId/licenses/:id', { templateUrl: 'partials/license-detail.html', controller: LicenseDetailsCtrl }).
                    when('/customers/:customerId/licenses', { templateUrl: 'partials/license-list.html', controller: LicenseListCtrl }).
                    when('/customers/:customerId/licenses/add', { templateUrl: 'partials/license-add.html', controller: LicenseAddCtrl }).
                    when('/customers/:customerId/licenses/:id', { templateUrl: 'partials/license-detail.html', controller: LicenseDetailsCtrl }).
                    when('/licenses/add', { templateUrl: 'partials/license-add.html', controller: LicenseAddCtrl }).
                    when('/licenses', { templateUrl: 'partials/license-list.html', controller: LicenseListCtrl }).
                    when('/licenses/:id', { templateUrl: 'partials/license-detail.html', controller: LicenseDetailsCtrl }).
                    when('/login', { templateUrl: 'partials/login.html', controller: LoginCtrl }).
                    when('/', { templateUrl: 'partials/login.html', controller: LoginCtrl }).
                    otherwise({ redirectTo: '/' });

                $locationProvider.html5Mode(false).hashPrefix('!');
            }]);

app.controller('AppController', function ($scope, $rootScope, $location, $log, Auth) {

    $scope.isCurrentMainMenuItem = function(menuItem) {
        return $location.path().split('/')[1] === menuItem;
    };

    $scope.logout = function() {
        Auth.logout();
    };
    
    $rootScope.$on('event:auth-loginRequired', function() {
        $rootScope.authReferrerUrl = $location.path();
        $log.error('Error - event:auth-loginRequired on path ' + $rootScope.authReferrerUrl);
        $location.path('/login');
    });

    $rootScope.$on('event:auth-loginConfirmed', function() {
        $log.log('Success - event:auth-loginConfirmed on path ' + $location.path() + ' with ref Url ' + $rootScope.authReferrerUrl);

        if ($rootScope.authReferrerUrl != undefined)
            $location.path($rootScope.authReferrerUrl);

        $location.path('/');
    });
});


function toAssociativeArray(array) {
    var associativeArray = [];
    angular.forEach(array, function (val, key) {
        associativeArray.push({ "Key": key, "Value": val });
    });

    return associativeArray;
};

function toArray(associativeArray) {
    var array = [];
    angular.forEach(associativeArray, function (val, key) {
        array.push(val.Value);
    });

    return array;
};

function toDictionary(associativeArray) {
    var array = {};
    angular.forEach(associativeArray, function (val, key) {
        array[val.Key] = val.Value;
    });

    return array;
};
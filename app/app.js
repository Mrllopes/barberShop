window.$ = window.jQuery = require('jquery');
var jqueryui = require('jquery-ui-build');
moment = require('moment');
require('../lib/material.min.js');
var angular = require('angular');
require('../lib/locale.js');
require('../lib/angular-locale_pt-br.min.js');
var angularMaterial = require('angular-material');
var angularAria = require('angular-aria');
var angularAnimate = require('angular-animate');
var angularRoute = require('angular-route');
var angularSanitize = require('angular-sanitize');
require('angular-moment');
require('angular-local-storage');
require('angular-loading-bar');
require('angular-input-masks');
require('humanize-duration');
var draganddrop = require('angular-dragdrop');
require('angular-input-masks');




(function () {
    'use strict';
    angular
        .module('barberShop', ['ngMaterial', 'ngRoute', 'ngDragDrop', 'angularMoment', 'LocalStorageModule', 'angular-loading-bar',
            'cfp.loadingBar', 'ngAnimate', 'ngSanitize', 'ui.utils.masks'])
        .config(routeConfig)
        .config(storageConfig)
        .run(routeCheck);

    routeCheck.$inject = ['$rootScope', '$location', '$mdToast', '$mdMedia', 'LoginService', 'ToastService'];

    function routeCheck($rootScope, $location, $mdToast, $mdMedia, LoginService, ToastService) {
        $rootScope.$on("$routeChangeStart", function (evt, to, from) {
            if (to.authorize === true) {
                LoginService
                    .getLogin()
                    .then(function (response) {
                        if (response) {
                            if (to.access_level.indexOf(response.access_level) == -1) {
                                $location.path("/");
                                ToastService
                                    .showToast('Permissão negada');
                            }
                        } else {
                            if (to.route_name == 'categoria' || to.route_name == 'produto')
                                $location.path("/");
                        }
                    })
            }
        });
        $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
            $location.path("/")
        });
    }

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/modules/home/views/home.html',
                controller: 'homeController',
                controllerAs: 'hc',
                authorize: false,
                route_name: 'home'

            })
            .when('/loja', {
                templateUrl: 'app/modules/shop/views/shop.html',
                controller: 'shopController',
                controllerAs: 'sc',
                authorize: true,
                access_level: [2],
                route_name: 'loja'
            })
            .when('/carrinho', {
                templateUrl: 'app/modules/cart/views/cart.html',
                controller: 'cartController',
                controllerAs: 'cc',
                authorize: true,
                access_level: [2],
                route_name: 'carrinho'
            })
            .when('/produto', {
                templateUrl: 'app/modules/product/views/product.html',
                controller: 'productController',
                controllerAs: 'pc',
                authorize: true,
                access_level: [1],
                route_name: 'produto'
            })
            .when('/categoria', {
                templateUrl: 'app/modules/category/views/category.html',
                controller: 'categoryController',
                controllerAs: 'cc',
                authorize: true,
                access_level: [1],
                route_name: 'categoria'
            })
            .otherwise({
                templateUrl: 'app/modules/home/views/home.html',
                controller: 'homeController',
                controllerAs: 'lc',
                authorize: false,
                route_name: 'home'
            });
        //$locationProvider.html5Mode(true);
    }

    storageConfig.$inject = ['localStorageServiceProvider'];

    function storageConfig(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('barberShop');
    }

})();
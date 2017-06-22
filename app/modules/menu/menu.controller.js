(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', '$location', '$mdDialog', 'UserService', 'LoginService', 'CartService', 'cfpLoadingBar', '$timeout', '$rootScope', 'ProductsService', 'CategoriesService'];

    function menuController($scope, $location, $mdDialog, UserService, LoginService, CartService, cfpLoadingBar, $timeout, $rootScope, ProductsService, CategoriesService) {
        var mc = this;
        mc.goTo = goTo;
        mc.openLogin = openLogin;
        mc.logout = logout;
        mc.customFullscreen = true;
        mc.userLogged;
        mc.cartNum;
        mc.cart = [];
        mc.client = {
            login: 'cliente',
            password: 'cliente',
            access_level: 2

        }
        mc.admin = {
            login: 'admin',
            password: 'admin',
            access_level: 1,
        }
        mc.products =
            [
                {
                    'product_id': 1,
                    'img': null,
                    'price': 20.00,
                    'name': 'shampoo',
                    'description': 'Além de deixar os seus cabelos lindos e com um aspecto maravilhoso o shampoo trata a caspa, em poucas semanas',
                    'quantity': 5,
                    'category_id': 1
                },
                {
                    'product_id': 2,
                    'img': null,
                    'price': 20.00,
                    'name': 'Pós Barba',
                    'description': 'Um pós barba multifuncional que hidrata, acalma, reequilibra e energiza a pele',
                    'quantity': 5,
                    'category_id': 2
                },
                {
                    'product_id': 3,
                    'img': null,
                    'price': 20.00,
                    'name': 'Prestobarba',
                    'description': 'Menos irritação até em pele sensível',
                    'quantity': 5,
                    'category_id': 2
                },
                {
                    'product_id': 4,
                    'img': null,
                    'price': 20.00,
                    'name': 'Prestobarba',
                    'description': 'Menos irritação até em pele sensível',
                    'quantity': 5,
                    'category_id': 2
                },
                {
                    'product_id': 5,
                    'img': null,
                    'price': 20.00,
                    'name': 'Prestobarba',
                    'description': 'Menos irritação até em pele sensível',
                    'quantity': 5,
                    'category_id': 2
                },
                {
                    'product_id': 6,
                    'img': null,
                    'price': 20.00,
                    'name': 'Prestobarba',
                    'description': 'Menos irritação até em pele sensível',
                    'quantity': 5,
                    'category_id': 2
                }
            ];
        mc.categories =
            [
                {
                    'category_id': 1,
                    'description': 'Sem Categoria'
                },
                {
                    'category_id': 2,
                    'description': 'Higiene pessoal'
                }
            ];
        init();

        function init() {
            LoginService
                .getLogin()
                .then(function (response) {
                    if (response == null) {
                        setUsers();
                        mc.cartNum = 0;
                    }
                    else {
                        mc.userLogged = response;
                        getNumCart()
                        CartService
                            .getCart()
                            .then(function (response) {
                                if (response == null) {
                                    console.log('getCart-menu')
                                    CartService
                                        .setCart(mc.cart)
                                        .then(function (response) {
                                        })
                                }
                            })
                    }

                })
            ProductsService
                .getProducts()
                .then(function (response) {
                    if (response == null) {
                        console.log('getProducts-shop')
                        ProductsService
                            .setProducts(mc.products)
                            .then(function (response) {
                            })
                    } else mc.products = response;
                })
            CategoriesService
                .getCategories()
                .then(function (response) {
                    if (response == null) {
                        console.log('getProducts-shop')
                        CategoriesService
                            .setCategories(mc.categories)
                            .then(function (response) {
                            })
                    } else mc.categories = response;
                })
        }
        /**
         * @description Function get the number of products on the cart
         */
        function getNumCart() {
            CartService
                .getCart()
                .then(function (response) {
                    if (response == null) {
                        console.log('getCart-menu')
                        CartService
                            .setCart(mc.cart)
                            .then(function (response) {
                            })
                    } else mc.cartNum = response.length;
                })
        }
        /**
         * @description Function to set the users (admin end client) and empty cart (the first)
         */

        function setUsers() {
            UserService
                .setClient(mc.client)
                .then(function () {
                    UserService
                        .setAdmin(mc.admin)
                        .then(function () {
                        })
                })
        }

        /**
        *  @description Function to change the route
        *  @param {*} page
        */
        function goTo(page) {
            cfpLoadingBar.start();
            $timeout(function () {
                cfpLoadingBar.complete();
            }, 600);
            $location.path(page);
        }

        /**
        *  @description Open modal to login
        *  @param {*} ev
        */
        function openLogin(ev) {
            $mdDialog.show({
                controller: LoginController,
                templateUrl: 'app/modules/menu/views/dialog.login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: mc.customFullscreen, // Only for -xs, -sm breakpoints.
            })
                .then(function (userLogged) {
                    console.log('userLogged', userLogged)
                    mc.userLogged = userLogged;
                    $location.path('/');
                }, function () {

                });
        };

        /**
         * @description Function of contoller the dialog
        */
        LoginController.$inject = ['$scope', '$rootScope', '$mdDialog', 'LoginService', 'ToastService', 'UserService'];
        function LoginController($scope, $rootScope, $mdDialog, LoginService, ToastService, UserService) {
            $scope.client;
            $scope.admin;
            $scope.cancel = cancel;
            $scope.checkLogin = checkLogin;

            init()

            function init() {
                UserService
                    .getClient()
                    .then(function (client) {
                        $scope.client = client;
                        UserService
                            .getAdmin()
                            .then(function (admin) {
                                $scope.admin = admin;
                            })
                    })
            }


            /**
             * @description Function to close the dialog of login
             */
            function cancel() {
                $mdDialog.cancel();
            }

            /**
             * @description Function to check the login and password of user
             * @param {*} user
             */
            function checkLogin(user) {
                console.log('user', user);
                console.log('$scope.client', $scope.client);
                console.log('$scope.admin', $scope.admin);
                if ($scope.client.login == user.login && $scope.client.password == user.password) {
                    console.log('cliente logado');
                    doLogin($scope.client);
                } else if ($scope.admin.login == user.login && $scope.admin.password == user.password) {
                    console.log('admin logado');
                    doLogin($scope.admin);
                } else {
                    console.log('erro de login');
                    ToastService
                        .showToast('Usuario e senha incorreto!');
                }
            }
            /**
             * @description Call the service to save the user logged
             * @param {*} user 
             */
            function doLogin(user) {
                LoginService
                    .setLogin(user)
                    .then(function () {
                        $rootScope.$broadcast('userlogged', true);
                        $rootScope.$broadcast('cartNumOnLogin');
                        $rootScope.$broadcast('getProductsLogin');
                        $mdDialog.hide(user);
                        ToastService
                            .showToast('Bem vindo ao BarberShop');
                    })
            }
        }
        /**
        *  @description Logout
        *  @param {*} ev
        */
        function logout(ev) {
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja sair?')
                .ariaLabel('logout')
                .targetEvent(ev)
                .ok('sim')
                .cancel('cancelar');

            $mdDialog.show(confirm).then(function () {
                mc.userLogged = null;
                $rootScope.$broadcast('userlogged', false);
                $rootScope.$broadcast('getProductsLogout');
                mc.cartNum = 0;
                $location.path('/');
                LoginService.logout();
            });
        }
        /**
         * @description broadcast to set the number of products in the cart
         */
        $scope.$on('cartNum', function (event, args) {
            console.log('cartNum', args)
            mc.cartNum = args;
        });
        /**
         * @description broadcast to set the number of products in the cart on the login
         */
        $scope.$on('cartNumOnLogin', function () {
            CartService
                .getCart()
                .then(function (response) {
                    if (response == null) {
                        mc.cartNum = 0;
                    } else mc.cartNum = response.length;
                })
        });
    }
})();
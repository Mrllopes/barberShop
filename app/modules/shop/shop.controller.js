(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('shopController', shopController);

    shopController.$inject = ['$scope', 'ServicesService', 'BarbersService', '$mdDialog', 'LoginService', 'ToastService', 'CategoriesService', 'ProductsService'];

    function shopController($scope, ServicesService, BarbersService, $mdDialog, LoginService, ToastService, CategoriesService, ProductsService) {
        var sc = this;
        sc.checkImg = checkImg;
        sc.selectCategory = selectCategory;
        sc.openProduct = openProduct;
        sc.selectedCategory = [];
        sc.products = [];
        sc.categories = [];
        sc.user;

        init();

        function init() {
            LoginService
                .getLogin()
                .then(function (response) {
                    console.log('aqui', response)
                    if (response) sc.user = true
                    else sc.user = false;
                })
            CategoriesService
                .getCategories()
                .then(function (response) {
                    if (response != null) {
                        sc.categories = response;
                    }
                })
            ProductsService
                .getProducts()
                .then(function (response) {
                    if (response != null) {
                        sc.products = response;
                    }
                })
        }

        /**
         * @description broadcast to check user logged
         */
        $scope.$on('userlogged', function (event, args) {
            console.log('userlogged2', args)
            sc.user = args;
        });

        function checkImg(img) {
            if (img != null) return img;
            else return "./app/img/product-default.jpg";

        }

        /**
        *  @description Push category to var selectedCategory
        *  @param {*} item
        */
        function selectCategory(item) {
            var idx = sc.selectedCategory.indexOf(item);
            if (idx > -1) {
                sc.selectedCategory.splice(idx, 1);
            }
            else {
                sc.selectedCategory.push(item);
            }
            console.log(sc.selectedCategory);
        };

        /**
        *  @description Open the dialog of product
        *  @param {*} ev
        */
        function openProduct(ev, product) {
            if (sc.user) {
                console.log(product)
                $mdDialog.show({
                    controller: DialogProductController,
                    templateUrl: 'app/modules/shop/views/dialog.product.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true, // Only for -xs, -sm breakpoints.
                    locals: {
                        product: product,
                    }
                })
                    .then(function (userLogged) {
                        console.log('userLogged', userLogged)
                        sc.userLogged = userLogged;

                    }, function () {

                    });
            } else {
                ToastService
                    .showToast('Efetue o login para continuar');
            }
        }
        /**
         * @description Function of contoller the dialog
        */
        DialogProductController.$inject = ['$rootScope', '$location', '$scope', '$mdDialog', '$timeout', 'ToastService', 'CartService', 'product', 'cfpLoadingBar'];
        function DialogProductController($rootScope, $location, $scope, $mdDialog, $timeout, ToastService, CartService, product, cfpLoadingBar) {
            $scope.product = angular.copy(product);
            $scope.cancel = cancel;
            $scope.addProductCart = addProductCart;
            $scope.goTo = goTo;

            /**
             * @description Function to close the dialog
             */
            function cancel() {
                $mdDialog.cancel();
            }

            /**
             * @description Function to add the product chosen to cart
             * @param {*} user
             */
            function addProductCart() {
                var obj = {
                    product_id: $scope.product.product_id,
                    name: $scope.product.name,
                    price: $scope.product.price,
                    quantityToBuy: 1,
                    quantity: $scope.product.quantity,
                    sum: $scope.product.price
                }
                CartService
                    .getCart()
                    .then(function (response) {
                        var productChosen = response.find(x => x.product_id === $scope.product.product_id);
                        console.log('productChosen', productChosen, productChosen && productChosen.length > 0);
                        if (!productChosen) {
                            response.push(obj);
                            $rootScope.$broadcast('cartNum', response.length);
                            CartService
                                .setCart(response)
                                .then(function (response) {
                                    ToastService
                                        .showToast('Produto enviado para o carrinho');
                                    $mdDialog.hide();
                                    $location.path('/carrinho');
                                })
                            console.log('1');
                        } else {
                            console.log('2');
                            ToastService
                                .showToast('Produto já contido no carrinho');
                            $mdDialog.hide();
                            $scope.goTo('/carrinho');
                        }
                    })
            }

            function goTo(page) {
                cfpLoadingBar.start();
                $timeout(function () {
                    cfpLoadingBar.complete();
                }, 600);
                $location.path(page);
            }
        }
    }
})();
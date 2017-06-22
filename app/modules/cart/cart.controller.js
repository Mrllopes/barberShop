(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('cartController', cartController);

    cartController.$inject = ['$scope', '$mdDialog', '$rootScope', '$filter', 'ToastService', 'CartService', 'LoginService', 'ProductsService'];

    function cartController($scope, $mdDialog, $rootScope, $filter, ToastService, CartService, LoginService, ProductsService) {
        var cc = this;
        cc.products = [];
        cc.allProducts = [];
        cc.total = 0;
        cc.sumProductPrice = sumProductPrice;
        cc.sumTotalPrice = sumTotalPrice;
        cc.addProduct = addProduct;
        cc.removeProduct = removeProduct;
        cc.removeFromCart = removeFromCart;
        cc.confirmPurchase = confirmPurchase;


        init();

        function init() {
            LoginService
                .getLogin()
                .then(function (response) {
                    if (response) getProducts();
                })
            ProductsService
                .getProducts()
                .then(function (response) {
                    if (response != null) {
                        cc.allProducts = response;
                    }
                })
        }

        /**
         * @description return the prive the price of the sum the products to buy
         * @param {*} product
         */
        function sumProductPrice(product) {
            product.sum = product.price * product.quantityToBuy
            sumTotalPrice();
        }

        /**
         * @description return the value to pay
         */
        function sumTotalPrice() {
            cc.total = 0;
            angular.forEach(cc.products, function (product) {
                cc.total += product.sum;
            });
        }

        /**
         * @description Add 1 the number of product until quantity max
         */
        function addProduct(product) {
            var quantityToBuy = product.quantityToBuy
            if ((quantityToBuy += 1) <= product.quantity) {
                product.quantityToBuy += 1;
                sumProductPrice(product);
            }
        }

        /**
         * @description Remove 1 the number of product until 1
         */
        function removeProduct(product) {
            var quantityToBuy = product.quantityToBuy
            if ((quantityToBuy -= 1) >= 1) {
                product.quantityToBuy -= 1;
                sumProductPrice(product);
            }
        }
        /**
         * @description Remove the product from cart
         */
        function removeFromCart(ev, product) {
            var remove = $mdDialog.confirm()
                .title('Tem certeza que deseja remover ' + product.name + ' do carrinho?')
                .ariaLabel('removeFromCart')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(remove).then(function () {
                var toRemove = cc.products.findIndex(x => x.product_id === product.product_id);
                if (toRemove > -1) {
                    cc.products.splice(toRemove, 1);
                    CartService
                        .setCart(cc.products)
                        .then(function (response) {
                            $rootScope.$broadcast('cartNumOnLogin');
                            ToastService
                                .showToast('Produto removido');
                            sumTotalPrice();
                        })
                }
            });
        }

        /**
         * @description Confirms the purchase and ends one
         */
        function confirmPurchase(ev) {
            var confirm = $mdDialog.confirm()
                .title('Comfirme sua compra')
                .textContent('O valor total de sua compra é ' + $filter('currency')(cc.total, 'R$ '))
                .ariaLabel('confirmPurchase')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                angular.forEach(cc.products, function (product) {
                    angular.forEach(cc.allProducts, function (productShop) {
                        if (product.product_id == productShop.product_id) {
                            productShop.quantity -= product.quantityToBuy;
                            return 1;
                        }
                    })
                })
                ProductsService
                    .setProducts(cc.allProducts)
                    .then(function (response) {
                    })
                cc.products = [];
                CartService
                    .setCart(cc.products)
                    .then(function (response) {
                        $rootScope.$broadcast('cartNumOnLogin');
                        ToastService
                            .showToast('Compra finalizada com sucesso');
                        sumTotalPrice();
                    })
            });
        }

        /**
         * @description Get the products of cart
         */
        function getProducts() {
            CartService
                .getCart()
                .then(function (response) {
                    cc.products = response
                    sumTotalPrice();
                })
        }

        /**
         * @description broadcast to call function getProducts on login
         */
        $scope.$on('getProductsLogin', function () {
            getProducts()
        });
        /**
         * @description broadcast to call function getProducts on the logout
         */
        $scope.$on('getProductsLogout', function () {
            cc.products = [];
        });
    }
})();
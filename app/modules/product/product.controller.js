(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('productController', productController);

    productController.$inject = ['$mdDialog', 'ToastService', 'ProductsService'];

    function productController($mdDialog, ToastService, ProductsService) {
        var pc = this;
        pc.products = [];
        pc.product;
        pc.limit = 5;
        pc.remove = remove;
        pc.openRegister = openRegister;


        init();

        function init() {
            ProductsService
                .getProducts()
                .then(function (response) {
                    if (response != null) {
                        pc.products = response;
                    }
                })
        }

        /**
         * @description Remove the product from cart
         */
        function remove(ev, product) {
            var remove = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir esse produto?')
                .ariaLabel('remove')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(remove).then(function () {
                var toRemove = pc.products.findIndex(x => x.product_id === product.product_id);
                console.log('toRemove', toRemove)
                if (toRemove > -1) {
                    pc.products.splice(toRemove, 1);
                    ProductsService
                        .setProducts(pc.products)
                        .then(function (response) {
                            ToastService
                                .showToast('Produto removido');
                        })
                    console.log('depois', pc.products);
                }
            });
            console.log('antes', pc.products);
        }

        /**
        *  @description Open modal to register product
        *  @param {*} ev
        */
        function openRegister(ev, product, type) {
            $mdDialog.show({
                controller: NewProductController,
                templateUrl: 'app/modules/product/views/dialog.product.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true, // Only for -xs, -sm breakpoints.
                locals: {
                    products: pc.products,
                    product: product,
                    type: type
                }
            })
                .then(function () {
                    init();

                }, function () {

                });
        };

        /**
         * @description Function of contoller the dialog
        */
        NewProductController.$inject = ['$scope', '$mdDialog', 'products', 'product', 'type', 'CategoriesService', 'ToastService', 'ProductsService'];

        function NewProductController($scope, $mdDialog, products, product, type, CategoriesService, ToastService, ProductsService) {
            $scope.products = angular.copy(products);
            $scope.product = angular.copy(product);
            $scope.type = angular.copy(type); // type = 0 (new), type = 1 (edit)
            $scope.client;
            $scope.edit;
            $scope.categories = [];
            $scope.cancel = cancel;
            $scope.save = save;
            $scope.changeOp = changeOp;
            $scope.title = "Novo produto";

            init()

            function init() {
                if ($scope.type == 0) {
                    console.log('teste', $scope.type)
                    $scope.edit = false;
                } else {
                    $scope.edit = true;
                    $scope.title = "Detahles do produto";
                }
                CategoriesService
                    .getCategories()
                    .then(function (response) {
                        if (response != null) {
                            $scope.categories = response;
                        }
                    })
            }


            /**
             * @description Function to close the dialog of login
             */
            function cancel() {
                $mdDialog.cancel();
            }

            /**
             * @description Function to check new id
             * @param {*} user
             */
            function save(product) {
                if (!$scope.type) {
                    if ($scope.products.length == 0) {
                        product.product_id = 1;
                        callServe(product);
                    } else {
                        product.product_id = $scope.products[$scope.products.length - 1].product_id + 1;
                        callServe(product);
                    }
                } else {
                    editProduct(product);
                }
            }

            /**
             * @description Function to edit the product
             * @param {*} user
             */
            function editProduct(product) {
                var products = angular.copy($scope.products)
                console.log('antes', $scope.products[0])
                angular.forEach(products, function (element, idx) {
                    if (element.product_id == product.product_id) {
                        $scope.products[idx] = product;
                        console.log('depois', $scope.products[idx])
                        callServe(product);
                        return 1;
                    }
                })

            }

            /**
             * @description Function to save the product
             * @param {*} user
             */
            function callServe(product) {
                if (!$scope.type)
                    $scope.products.push(product);
                ProductsService
                    .setProducts($scope.products)
                    .then(function (response) {
                        $mdDialog.hide();
                    })

            }
            /**
             * @description Function change the value of $scope.edit to allow the user edit the product
             * @param {*} user
             */
            function changeOp() {
                $scope.edit = !$scope.edit;
                $scope.title = "Editar produto";
            }
        }
    }
})();
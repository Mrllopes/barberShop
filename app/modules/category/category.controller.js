(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('categoryController', categoryController);

    categoryController.$inject = ['$mdDialog', 'ToastService', 'CategoriesService', 'ProductsService'];

    function categoryController($mdDialog, ToastService, CategoriesService, ProductsService) {
        var cc = this;
        cc.categorys = [];
        cc.category;
        cc.limit = 5;
        cc.remove = remove;
        cc.openRegister = openRegister;


        init();

        function init() {
            CategoriesService
                .getCategories()
                .then(function (response) {
                    if (response != null) {
                        cc.categorys = response;
                    }
                })
        }

        /**
         * @description Remove the category from cart
         */
        function remove(ev, category) {
            var remove = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir essa categoria?')
                .ariaLabel('remove')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(remove).then(function () {
                ProductsService
                    .getProducts()
                    .then(function (response) {
                        console.log('response', response)
                        var findCategory = response.findIndex(x => x.category_id === category.category_id);
                        if (findCategory > -1) {
                            ToastService
                                .showToast('Categoria não pode ser excluida');
                        } else {
                            var toRemove = cc.categorys.findIndex(x => x.category_id === category.category_id);
                            console.log('toRemove', toRemove)
                            if (toRemove > -1) {
                                cc.categorys.splice(toRemove, 1);
                                CategoriesService
                                    .setCategories(cc.categorys)
                                    .then(function (response) {
                                        ToastService
                                            .showToast('Categoria removida');
                                    })
                                console.log('depois', cc.categorys);
                            }
                        }
                    })
            });
            console.log('antes', cc.categorys);
        }

        /**
        *  @description Open modal to register category
        *  @param {*} ev
        */
        function openRegister(ev, category, type) {
            $mdDialog.show({
                controller: NewProductController,
                templateUrl: 'app/modules/category/views/dialog.category.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true, // Only for -xs, -sm breakpoints.
                locals: {
                    categorys: cc.categorys,
                    category: category,
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
        NewProductController.$inject = ['$scope', '$mdDialog', 'categorys', 'category', 'type', 'CategoriesService', 'ToastService'];
        function NewProductController($scope, $mdDialog, categorys, category, type, CategoriesService, ToastService) {
            $scope.categorys = angular.copy(categorys);
            $scope.category = angular.copy(category);
            $scope.type = angular.copy(type); // type = 0 (new), type = 1 (edit)
            $scope.client;
            $scope.edit;
            $scope.categories = [];
            $scope.cancel = cancel;
            $scope.save = save;
            $scope.changeOp = changeOp;
            $scope.title = "Nova categoria";

            init()

            function init() {
                if ($scope.type == 0) {
                    console.log('teste', $scope.type)
                    $scope.edit = false;
                } else {
                    $scope.edit = true;
                    $scope.title = "Detalhes da categoria";
                }
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
            function save(category) {
                if (!$scope.type) {
                    if ($scope.categorys.length == 0) {
                        category.category_id = 1;
                        callServe(category);
                    } else {
                        category.category_id = $scope.categorys[$scope.categorys.length - 1].category_id + 1;
                        callServe(category);
                    }
                } else {
                    editProduct(category);
                }
            }

            /**
             * @description Function to edit the category
             * @param {*} user
             */
            function editProduct(category) {
                var categorys = angular.copy($scope.categorys)
                console.log('antes', $scope.categorys[0])
                angular.forEach(categorys, function (element, idx) {
                    if (element.category_id == category.category_id) {
                        $scope.categorys[idx] = category;
                        console.log('depois', $scope.categorys[idx])
                        callServe(category);
                        return 1;
                    }
                })

            }

            /**
             * @description Function to save the category
             * @param {*} user
             */
            function callServe(category) {
                if (!$scope.type)
                    $scope.categorys.push(category);
                CategoriesService
                    .setCategories($scope.categorys)
                    .then(function (response) {
                        $mdDialog.hide();
                    })
            }

            /**
             * @description Function change the value of $scope.edit to allow the user edit the category
             * @param {*} user
             */
            function changeOp() {
                $scope.edit = !$scope.edit;
                $scope.title = "Editar categoria";
            }
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('ProductsService', ProductsService);

    ProductsService.$inject = ['localStorageService', '$q'];

    function ProductsService( localStorageService, $q) {

        var service = {
            setProducts: setProducts,
            getProducts: getProducts
        }

        return service;
        /**
         * @description Function to set in the localStorage the products
         * @param {*} obj 
         */
        function setProducts(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('products', obj));
        }

        /**
         * @description Function to get the products  
         */
        function getProducts() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('products'));
        }

    }

})();
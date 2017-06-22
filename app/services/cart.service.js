(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('CartService', CartService);

    CartService.$inject = ['localStorageService', '$q'];

    function CartService(localStorageService, $q) {

        var service = {
            setCart: setCart,
            getCart: getCart
        }

        return service;
        /**
         * @description Function to set in the localStorage the cart of BarberShop 
         * @param {*} obj 
         */
        function setCart(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('cart', obj));
        }

        /**
         * @description Function to get the cart of LocalStorage  
         */
        function getCart() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('cart'));
        }

    }

})();
(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('CategoriesService', CategoriesService);

    CategoriesService.$inject = ['localStorageService', '$q'];

    function CategoriesService(localStorageService, $q) {

        var service = {
            setCategories: setCategories,
            getCategories: getCategories
        }

        return service;
        /**
         * @description Function to set in the localStorage the categories
         * @param {*} obj 
         */
        function setCategories(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('categories', obj));
        }

        /**
         * @description Function to get the categories  
         */
        function getCategories() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('categories'));
        }

    }

})();
(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('UserService', UserService);

    UserService.$inject = ['localStorageService', '$q'];

    function UserService(localStorageService, $q) {

        var service = {
            setClient: setClient,
            getClient: getClient,
            setAdmin: setAdmin,
            getAdmin: getAdmin
        }

        return service;
        /**
         * @description Function to set in the localStorage the user client
         * @param {*} obj 
         */
        function setClient(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('client', obj));
        }

        /**
         * @description Function to get the user client of LocalStorage  
         */
        function getClient() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('client'));
        }
        /**
         * @description Function to set in the localStorage the user admin
         * @param {*} obj 
         */
        function setAdmin(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('admin', obj));
        }

        /**
         * @description Function to get the user admin of LocalStorage  
         */
        function getAdmin() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('admin'));
        }

    }

})();
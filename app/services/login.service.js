(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('LoginService', LoginService);

    LoginService.$inject = ['localStorageService', '$q'];

    function LoginService(localStorageService, $q) {

        var service = {
            setLogin: setLogin,
            getLogin: getLogin,
            logout: logout
        }

        return service;

        /**
         * @description Function to set in the localStorage the user logged
         * @param {*} obj 
         */
        function setLogin(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('userLogged', obj));
        }

        /**
         * @description Function to get in the localStorage the user logged  
         */
        function getLogin() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('userLogged'));
        }
        /**
         * @description Function to delete the key userLogged of localStorage  
         */
        function logout() {
            localStorageService.setStorageType('localStorage');
            return localStorageService.remove('userLogged');
        }

    }

})();
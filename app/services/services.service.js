(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('ServicesService', ServicesService);

    ServicesService.$inject = ['BarberShop', 'localStorageService', '$q'];

    function ServicesService(BarberShop, localStorageService, $q) {

        var service = {
            setServives: setServives,
            getServives: getServives
        }

        return service;
        /**
         * @description Function to set in the localStorage the servives of BarberShop 
         * @param {*} obj 
         */
        function setServives(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('services', obj));
        }

        /**
         * @description Function to get the servives of LocalStorage  
         */
        function getServives() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('services'));
        }
    }

})();
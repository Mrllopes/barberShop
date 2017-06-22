(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('BarbersService', BarbersService);

    BarbersService.$inject = ['BarberShop', 'localStorageService', '$q'];

    function BarbersService(BarberShop, localStorageService, $q) {

        var service = {
            setBarbers: setBarbers,
            getBarbers: getBarbers
        }

        return service;
        /**
         * @description Function to set in the localStorage the servives of BarberShop 
         * @param {*} obj 
         */
        function setBarbers(obj) {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.set('barbers', obj));
        }

        /**
         * @description Function to get the servives of LocalStorage  
         */
        function getBarbers() {
            localStorageService.setStorageType('localStorage');
            return $q.resolve(localStorageService.get('barbers'));
        }

    }

})();
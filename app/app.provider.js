(function () {
    'use strict';

    angular
        .module('barberShop')
        .provider('BarberShop', BarberShopProvider);

    function BarberShopProvider() {
        var _url = 'http://localhost:8000/';
        var _module = '';

        this.setUrl = function (url) {
            _url = url;
        }

        this.setModule = function (moduleName) {
            _module = moduleName;
        }

        this.$get = function () {
            return {
                urlBase: _url,
                moduleBase: _module
            }
        }
    }
})();
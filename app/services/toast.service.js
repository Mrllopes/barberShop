(function () {
    'use strict';

    angular
        .module('barberShop')
        .service('ToastService', ToastService);

    ToastService.$inject = ['$mdToast'];

    function ToastService($mdToast) {
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true,
        };

        var toastPosition = angular.extend({}, last);

        var service = {
            showToast: showToast
        }

        return service;
        function sanitizePosition() {
            var current = toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }

        function getToastPosition() {
            sanitizePosition();
            return Object.keys(toastPosition)
                .filter(function (pos) { return toastPosition[pos]; })
                .join(' ');
        }

        function showToast(msg) {
            var pin = getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position(pin)
                    .action('Fechar')
                    .highlightAction(true)
            );
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('barberShop')
        .controller('homeController', homeController);

    homeController.$inject = ['ServicesService', 'BarbersService'];

    function homeController(ServicesService, BarbersService) {
        var hc = this;
        hc.services =
            [
                {
                    'img': './app/img/hear.jpg',
                    'service': 'Corte de Cabelo',
                    'description': 'Fazemos cortes de cabelo para atender o homem moderno e deixar o visual sempre em dia.'
                },
                {
                    'img': './app/img/barber.jpg',
                    'service': 'Barba',
                    'description': 'Cuidamos da barba da maneira clássica, com navalha e toalha quente.'

                }

            ];
        hc.barbers =
            [
                {
                    'img': './app/img/default-user.png',
                    'nome': 'Mario'
                },
                {
                    'img': './app/img/default-user.png',
                    'nome': 'Jorge'
                },
                {
                    'img': './app/img/default-user.png',
                    'nome': 'Lucas'
                }
            ];


        init();

        function init() {
            getBarbers();
            getServives();
            //ServicesService.setServives(hc.services);
            //BarbersService.setBarbers(hc.barbers);
        }
        /**
         * Get the barbers, if don't have set the default
         */
        function getBarbers() {
            BarbersService
                .getBarbers()
                .then(function (response) {
                    if (response == null) {
                        BarbersService.setBarbers(hc.barbers);
                    } else hc.barbers = response;
                })
        }
        /**
         * Get the services, if don't have set the default
         */
        function getServives() {
            ServicesService
                .getServives()
                .then(function (response) {
                    if (response == null) {
                        ServicesService.setServives(hc.services);
                    } else hc.services = response;
                });
        }
    }
})();
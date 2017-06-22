(function () {
    'use strict';

    angular
        .module('barberShop')
        .config(themeConfig);

    themeConfig.$inject = ['$mdThemingProvider'];

    function themeConfig($mdThemingProvider) {
        $mdThemingProvider.definePalette('white', {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#ffffff',
            '300': '#ffffff',
            '400': '#ffffff',
            '500': '#ffffff',
            '600': '#f0f0f0',
            '700': '#e0e0e0',
            '800': '#d1d1d1',
            '900': '#c2c2c2',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#ffffff',
            'A700': '#e0e0e0',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
        });

        $mdThemingProvider.definePalette('blue', {
            '50': '#def7f5',
            '100': '#a0e9e2',
            '200': '#72dfd4',
            '300': '#38d1c3',
            '400': '#2cbfb1',
            '500': '#26a69a',
            '600': '#208d83',
            '700': '#1b746c',
            '800': '#155b55',
            '900': '#0f423e',
            'A100': '#def7f5',
            'A200': '#a0e9e2',
            'A400': '#2cbfb1',
            'A700': '#1b746c',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('red', {
            '50': '#ffffff',
            '100': '#ffbdbd',
            '200': '#ff8585',
            '300': '#ff3d3d',
            '400': '#ff1f1f',
            '500': '#ff0000',
            '600': '#e00000',
            '700': '#c20000',
            '800': '#a30000',
            '900': '#850000',
            'A100': '#ffffff',
            'A200': '#ffbdbd',
            'A400': '#ff1f1f',
            'A700': '#c20000',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100 A200'
        });

        $mdThemingProvider.definePalette('green', {
            '50': '#ffffff',
            '100': '#ddf8e0',
            '200': '#afeeb6',
            '300': '#74e181',
            '400': '#5bdb6a',
            '500': '#42d653',
            '600': '#2ccd3f',
            '700': '#27b437',
            '800': '#229b2f',
            '900': '#1c8128',
            'A100': '#ffffff',
            'A200': '#ddf8e0',
            'A400': '#5bdb6a',
            'A700': '#27b437',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('purple', {
            '50': '#ffffff',
            '100': '#f0dff8',
            '200': '#dbb2ed',
            '300': '#c178e0',
            '400': '#b55fda',
            '500': '#aa46d4',
            '600': '#9e2fcc',
            '700': '#8a2ab3',
            '800': '#77249a',
            '900': '#641e81',
            'A100': '#ffffff',
            'A200': '#f0dff8',
            'A400': '#b55fda',
            'A700': '#8a2ab3',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('yellow', {
            '50': '#ffffff',
            '100': '#fffffb',
            '200': '#ffffc3',
            '300': '#ffff7b',
            '400': '#ffff5d',
            '500': '#ffff3e',
            '600': '#ffff1f',
            '700': '#ffff01',
            '800': '#e1e100',
            '900': '#c3c300',
            'A100': '#ffffff',
            'A200': '#fffffb',
            'A400': '#ffff5d',
            'A700': '#ffff01',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 700 800 900 A100 A200 A400 A700'
        });

        $mdThemingProvider.definePalette('orange', {
            '50': '#ffffff',
            '100': '#ffdebd',
            '200': '#ffc285',
            '300': '#ff9e3d',
            '400': '#ff8f1f',
            '500': '#ff8000',
            '600': '#e07100',
            '700': '#c26100',
            '800': '#a35200',
            '900': '#854300',
            'A100': '#ffffff',
            'A200': '#ffdebd',
            'A400': '#ff8f1f',
            'A700': '#c26100',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('black', {
            '50': '#858585',
            '100': '#5e5e5e',
            '200': '#424242',
            '300': '#1f1f1f',
            '400': '#0f0f0f',
            '500': '#000000',
            '600': '#000000',
            '700': '#000000',
            '800': '#000000',
            '900': '#000000',
            'A100': '#858585',
            'A200': '#5e5e5e',
            'A400': '#0f0f0f',
            'A700': '#000000',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 A100'
        });

        $mdThemingProvider.theme('barberShop')

            .primaryPalette('white')

            .accentPalette('black');

    }
})();
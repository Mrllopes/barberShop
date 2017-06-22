(function () {
    'use strict';

    angular
        .module('barberShop')
        .filter('categoryFilter', categoryFilter)


    function categoryFilter() {
        return function (elements, tags) {
            return elements.filter(function (elem) {
                if (tags.length == 0) {
                    return true;
                } else {
                    for (var i in tags) {
                        if(tags[i] == elem.category_id)
                        return true;
                    }
                }
            });
        };
    }
})();

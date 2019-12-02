
app.controller('salesController', function ($scope, service, $window, $location, $timeout) {

    $scope.service = service;

    $scope.sales = [];
    $scope.stores = [];
    $scope.errorCreate = "";
    $scope.errorEdit = "";

    $scope.getSales = function () {
        $scope.getStore();
        $scope.service.getSales().then(
            function (response) {
                $scope.sales = response.data;
            },
            function (response) {
                $scope.sales = [];
            }
        )
    };

    $scope.filterByStore = function (storeFilter) {
        $scope.service.getSalesByStore(storeFilter).then(
            function (response) {
                $scope.sales = response.data;
            },
            function (response) {
                $scope.sales = [];
            }
        )
    };

    $scope.getStore = function () {
        $scope.service.getStore().then(
            function (response) {
                $scope.stores = response.data;
            },
            function (response) {
                $scope.stores = [];
            }
        )
    };

    $scope.getProductsByStore = function (storeFilter) {
        $scope.service.getProductsByStore(storeFilter).then(
            function (response) {
                $scope.products = response.data;
            },
            function (response) {
                $scope.products = [];
            }
        )
    };

    $scope.addProduct = function (newSale, product) {
        if(newSale['products'] === undefined){
            newSale['products'] = []
        }
        newSale['products'].push(angular.copy(product))
    };

    $scope.createSale = function (newSale) {
        $scope.creating = true;
        $scope.errorCreate = "";
        $scope.service.createSale(newSale).then(
            function (response) {
                $scope.creating = false;
                $('#createSaleModal').modal('hide');
                $scope.sales.push(response.data);
            },
            function (response) {
                $scope.creating = false;
                for (key in response.data){
                    $scope.errorCreate += ""+key+": "+response.data[key];
                }
            }
        )
    }

    $scope.deleteSale = function (sale) {
        sale.deleting = true;
        $scope.deleting = true;
        $scope.service.deleteSale(sale).then(
            function (response) {
                sale.deleting = false;
                $scope.deleting = false;
                $scope.sales = $scope.sales.filter(function (s) {
                        return s.id !== sale.id
                })
            },
            function (response) {
                sale.deleting = false;
                $scope.deleting = false;
            }
        )
    };

    $scope.openEdit = function (sale) {
        $scope.saleToEdit = angular.copy(sale);
        $('#editSaleModal').modal('show');
    }

    $scope.editSale = function (sale) {
        $scope.editing = true;
        $scope.errorEdit = "";
        $scope.service.editSale(sale).then(
            function (response) {
                $scope.editing = false;
                sale = response.data;
                $('#editSaleModal').modal('hide');
                $scope.sales = $scope.sales.map( s => s.id === sale.id?sale:s )
            },
            function (response) {
                $scope.editing = false;
                for (key in response.data){
                    $scope.errorEdit += ""+key+": "+response.data[key];
                }
            }
        )
    };

    $scope.detailSale = function (sale) {
        $('#detailSaleModal').modal('show');
        $scope.saleToDetail = angular.copy(sale);
    };

});
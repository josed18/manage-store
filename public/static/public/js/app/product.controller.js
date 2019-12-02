
app.controller('productController', function ($scope, service, $window, $location, $timeout) {

    $scope.service = service;

    $scope.products = [];
    $scope.stores = [];
    $scope.errorCreate = "";
    $scope.errorEdit = "";

    $scope.getProducts = function () {
        $scope.getStore();
        $scope.service.getProducts().then(
            function (response) {
                $scope.products = response.data;
            },
            function (response) {
                $scope.products = [];
            }
        )
    };

    $scope.filterByStore = function (storeFilter) {
        $scope.service.getProductsByStore(storeFilter).then(
            function (response) {
                $scope.products = response.data;
            },
            function (response) {
                $scope.products = [];
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

    $scope.createProduct = function (newProduct) {
        $scope.creating = true;
        $scope.errorCreate = "";
        $scope.service.createProduct(newProduct).then(
            function (response) {
                $scope.creating = false;
                $('#createProductModal').modal('hide');
                $scope.products.push(response.data);
            },
            function (response) {
                $scope.creating = false;
                for (key in response.data){
                    $scope.errorCreate += ""+key+": "+response.data[key];
                }
            }
        )
    }

    $scope.deleteProduct = function (product) {
        product.deleting = true;
        $scope.deleting = true;
        $scope.service.deleteProduct(product).then(
            function (response) {
                product.deleting = false;
                $scope.deleting = false;
                $scope.products = $scope.products.filter(function (p) {
                        return p.id !== product.id
                })
            },
            function (response) {
                product.deleting = false;
                $scope.deleting = false;
            }
        )
    };

    $scope.openEdit = function (product) {
        let productToEdit = angular.copy(product);
        productToEdit['price'] = Number.parseFloat(productToEdit['price']);
        $scope.productToEdit = productToEdit;
        $('#editProductModal').modal('show');
    }

    $scope.editProduct = function (product) {
        $scope.editing = true;
        $scope.errorEdit = "";
        $scope.service.editProduct(product).then(
            function (response) {
                $scope.editing = false;
                product = response.data;
                $('#editProductModal').modal('hide');
                $scope.products = $scope.products.map( p => p.id === product.id?product:p )
            },
            function (response) {
                $scope.editing = false;
                for (key in response.data){
                    $scope.errorEdit += ""+key+": "+response.data[key];
                }
            }
        )
    }
});
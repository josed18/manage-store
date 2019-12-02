
app.controller('storeController', function ($scope, service, $window, $location, $timeout) {

    $scope.service = service;

    $scope.stores = [];
    $scope.errorCreate = "";
    $scope.errorEdit = "";

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

    $scope.createStore = function (newStore) {
        $scope.creating = true;
        $scope.errorCreate = "";
        $scope.service.createStore(newStore).then(
            function (response) {
                $scope.creating = false;
                $('#createStoreModal').modal('hide');
                $scope.stores.push(response.data);
            },
            function (response) {
                $scope.creating = false;
                for (key in response.data){
                    $scope.errorCreate += ""+key+": "+response.data[key];
                }
            }
        )
    }

    $scope.deleteStore = function (store) {
        store.deleting = true;
        $scope.deleting = true;
        $scope.service.deleteStore(store).then(
            function (response) {
                store.deleting = false;
                $scope.deleting = false;
                $scope.stores = $scope.stores.filter(function (s) {
                        return s.id !== store.id
                })
            },
            function (response) {
                store.deleting = false;
                $scope.deleting = false;
            }
        )
    }

    $scope.openEdit = function (store) {
        $scope.storeToEdit = angular.copy(store);
        $('#editStoreModal').modal('show');
    }

    $scope.editStore = function (store) {
        $scope.editing = true;
        $scope.errorEdit = "";
        $scope.service.editStore(store).then(
            function (response) {
                $scope.editing = false;
                store = response.data;
                $('#editStoreModal').modal('hide');
                $scope.stores = $scope.stores.map( s => s.id === store.id?store:s )
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
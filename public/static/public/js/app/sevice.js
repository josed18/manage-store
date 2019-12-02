
app.factory("service", function ($http) {

    var service = {};

    service.getStore = function () {
        return $http.get(url.store)
    };

    service.createStore = function (data) {
        return $http.post(url.store, data)
    };

    service.deleteStore = function (store) {
        return $http.delete(url.store+store.id+'/')
    };

    service.editStore = function (store) {
        let store_id = store['id'];
        delete store['id'];
        return $http.put(url.store+store_id+'/', store)
    };

    service.getProducts = function () {
        return $http.get(url.product)
    };

    service.getProductsByStore = function (storeId) {
        return $http.get(url.productByStore+storeId+'/')
    };

    service.createProduct = function (data) {
        return $http.post(url.product, data)
    };

    service.deleteProduct = function (product) {
        return $http.delete(url.product+product.id+'/')
    };

    service.editProduct = function (product) {
        let product_id = product['id'];
        delete product['id'];
        return $http.put(url.product+product_id+'/', product)
    };

    service.getSales = function () {
        return $http.get(url.sale)
    };

    service.getSalesByStore = function (storeId) {
        return $http.get(url.saleByStore+storeId+'/')
    };

    service.createSale = function (data) {
        return $http.post(url.sale, data)
    };

    service.deleteSale = function (sale) {
        return $http.delete(url.sale+sale.id+'/')
    };

    service.editSale = function (sale) {
        let sale_id = sale['id'];
        delete sale['id'];
        return $http.put(url.sale+sale_id+'/', sale)
    };

    return service
});
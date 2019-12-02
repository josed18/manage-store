/**
 * Created by josed18 on 21/02/19.
 */
app = angular.module('app', ['ngRoute'], function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');
  });
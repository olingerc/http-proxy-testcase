'use strict';

angular.module('bioseq')
.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.connection = 'init';

    var _socketBioinf = io.connect('http://localhost:5000/bioinf', {
        'sync disconnect on unload':false
    });
    setupConnections();

    function setupConnections() {
        _socketBioinf.on('connect', function(data) {
            console.info('connected', data);
            _socketBioinf.emit('request_monitor', {'username':'admin'});
            $scope.connection = 'connected';
            $rootScope.$apply();
        });

        _socketBioinf.on('monitor', function(data) {
            $scope.monitor = data;
            $rootScope.$apply();
        });

        _socketBioinf.on('disconnect', function() {
            console.info('disconnect');
            $scope.connection = 'no connection';
            $rootScope.$apply();
        });

        _socketBioinf.on('connect_failed', function(data) {
            console.error('connect_failed', data);
            $scope.connection = 'no connection';
            $rootScope.$apply();
        });

        _socketBioinf.on('error', function(data) {
            console.error('socket-error', data);
            $scope.connection = 'no connection';
            $rootScope.$apply();
        });
    }

}]);

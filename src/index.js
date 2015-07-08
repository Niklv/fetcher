var angular = require('angular');

var fetcherApp = angular.module('fetcherApp', []);

var postsCtrl = fetcherApp.controller('postsCtrl', function ($scope, $http) {
    $scope.isStarted = false;

    $scope.status = function(){
        $http.get('api/fetcher').success(function (data) {
            $scope.isStarted = data.isStarted;
        });
    };

    $scope.startFetcher = function() {
        $http.post('api/fetcher/start').success(function(data){
            $scope.isStarted = true;
        });
    };

    $scope.stopFetcher = function() {
        $http.post('api/fetcher/stop').success(function(data){
            $scope.isStarted = false;
        });
    };

    $scope.postSettings = function () {
        $http.post('api/fetcher/settings', $scope.settings);
    };

    $scope.getSettings = function() {
        $http.get('api/fetcher/settings').success(function (data) {
            $scope.settings = data;
        });
    };

    $scope.getPosts = function() {
        $http.get('api/fetcher/posts').success(function (data) {
            $scope.posts = data;
        });
    };

    $scope.getSettings();
    $scope.getPosts();
    $scope.status();

});

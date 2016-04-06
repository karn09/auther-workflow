'use strict';

app.controller('LoginCtrl', function($state, $log, LoginFactory, $scope) {
  $scope.submitLogin = function() {
    LoginFactory.login($scope.login)
    .then(function() {
      $state.go('stories');
    })
    .catch(function(error) {
      $state.go('login');
    });
  };
});

'use strict';

app.controller('LoginCtrl', function($log, LoginFactory, $scope) {
  $scope.submitLogin = function() {
    LoginFactory.login($scope.login)
    .then($log.log)
    .catch($log.error);
  };
});

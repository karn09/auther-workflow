'use strict';

app.controller('LoginCtrl', function($state, $log, AuthFactory, $scope) {
  $scope.submitLogin = function() {
    AuthFactory.login($scope.login)
    .then(function() {
      $state.go('stories');
    })
    .catch(function(error) {
      $state.go('login');
    });
  };
});

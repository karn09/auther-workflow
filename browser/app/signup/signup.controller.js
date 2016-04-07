app.controller('SignupCtrl', function($scope, $state, AuthFactory) {
  $scope.signup = function() {
    AuthFactory.signup({email: $scope.email, password: $scope.password})
      .then(function() {
        console.log('success creating user');
        $state.go('stories');
      })
      .catch(function(err) {
        console.log('try again', err);
        $state.go('signup');
      });
  };
});

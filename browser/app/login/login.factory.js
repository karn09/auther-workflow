'use strict';

app.factory('LoginFactory', function($http) {
  var loginObj = {};

  loginObj.login = function(login) {
    return $http.post('/api/users/login',login)
            .then(function(res) {
              return res.data;
            });
  };

  return loginObj;
});

app.factory('AuthFactory', function($http) {
  return {

    login: function(login) {
      return $http.post('/api/users/login', login)
        .then(function(res) {
          return res.data;
        });
    },

    signup: function(signup) {
      return $http.post('/api/users/signup', signup)
        .then(function(res) {
          return res.data;
        });
    },

    logout: function() {
      return $http.post('/api/users/logout')
        .then(function(res) {
          console.log(res);
          return res;
        });
    }

  };
});

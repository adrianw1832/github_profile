githubUserSearch.factory('SearchUser', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/users/';

  return {
    queryEachUser: function(user) {
      return $http({
        url: queryUrl + user,
        method: 'GET',
        params: {
          'access_token': gitToken
        }
      });
    }
  };
}]);

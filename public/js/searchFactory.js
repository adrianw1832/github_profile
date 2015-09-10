githubUserSearch.factory('Search', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/search/users';

  return {
    queryListOfUsers: function(searchTerm) {
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'q': searchTerm,
          'access_token': gitToken
        }
      });
    },

    queryEachUser: function(user) {
      return $http({
        url: 'https://api.github.com/users/' + user,
        method: 'GET',
        params: {
          'access_token': gitToken
        }
      });
    }
  };
}]);

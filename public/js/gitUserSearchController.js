githubUserSearch.controller('GitUserSearchController', ['Search', function (Search) {
  var self = this;
  self.doSearch = function() {
    self.searchResult = [];
    Search.queryListOfUsers(self.searchTerm).then(function(response) {
      angular.forEach(response.data.items, function(userInfo) {
        Search.queryEachUser(userInfo.login).then(function(details){
          self.searchResult.push(details.data);
        });
      });
    });
  };
}]);

githubUserSearch.controller('GitUserSearchController', ['Search', 'SearchUser', function (Search, SearchUser) {
  var self = this;
  self.doSearch = function() {
    self.searchResult = [];
    Search.queryListOfUsers(self.searchTerm).then(function(response) {
      angular.forEach(response.data.items, function(userInfo) {
        SearchUser.queryEachUser(userInfo.login).then(function(details){
          self.searchResult.push(details.data);
        });
      });
    });
  };
}]);

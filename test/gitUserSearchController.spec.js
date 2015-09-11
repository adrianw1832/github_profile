describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));
  var ctrl;

  describe('when user searching for a user', function() {
    var scope, fakeSearch;

    beforeEach(function(){
      module(function ($provide) {
        fakeSearch  = jasmine.createSpyObj('fakeSearch',  ['queryListOfUsers']); // here we create and inject a fakeService with a 'query' property
        $provide.factory('Search', function(){
          return fakeSearch;
        });
      });
    });

    beforeEach(function(){
      module(function ($provide) {
        fakeUserSearch  = jasmine.createSpyObj('fakeUserSearch',  ['queryEachUser']); // here we create and inject a fakeService with a 'query' property
        $provide.factory('SearchUser', function(){
          return fakeUserSearch;
        });
      });
    });

    beforeEach(inject(function ($q, $rootScope, $controller) {
      scope = $rootScope;
      ctrl = $controller('GitUserSearchController')
      q = $q
    }));


    var gitHubSearchResponse = {
      "items" : [
        {
          "login"     : "tansaku",
          "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
          "html_url"  : "https://github.com/tansaku"
        }
      ]
    };

    var gitHubFakeUserData = [
      {
        login: "tansaku",
        avatar_url: "https://avatars.githubusercontent.com/u/30216?v=3",
        url: "https://api.github.com/users/tansaku",
        html_url: "https://github.com/tansaku",
        public_repos: 238,
        followers: 197,
      }
    ]

    beforeEach(function() {
      fakeSearch.queryListOfUsers.and.returnValue(q.when( { data: gitHubSearchResponse }));
      fakeUserSearch.queryEachUser.and.returnValue(q.when({ data: gitHubFakeUserData }))
    });



    it("includes user search results in user data", function() {
      ctrl.searchTerm = 'tansaku';
      ctrl.doSearch();
      scope.$apply();
      expect(ctrl.searchResult[0]).toEqual(gitHubFakeUserData);
    });
  });
});

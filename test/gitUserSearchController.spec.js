describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));
  var ctrl;

  describe('when user searching for a user', function() {
    var scope, fakeSearch;

    beforeEach(function(){
      module(function ($provide) {
        fakeSearch  = jasmine.createSpyObj('fakeSearch',  ['query']); // here we create and inject a fakeService with a 'query' property
        $provide.factory('Search', function(){
          return fakeSearch;
        });
      });
    });

    var gitHubSearchResponse = {
      "items" : [
        {
          "login"     : "tansaku",
          "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
          "html_url"  : "https://github.com/tansaku"
        }
      ]
    }

    beforeEach(inject(function ($q, $rootScope) {
      scope = $rootScope;
      fakeSearch.query.and.returnValue($q.when( { data: gitHubSearchResponse }));
    }));

    beforeEach(inject(function($controller) {
      ctrl = $controller('GitUserSearchController');
    }));

    it("includes user search results in user data", function() {
      ctrl.searchTerm = 'tansaku';
      ctrl.doSearch();
      scope.$apply();
      expect(ctrl.searchResult.items).toEqual(gitHubSearchResponse.items);
    });
  });
});

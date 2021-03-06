describe('factory: Search', function() {
  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  var httpBackend;

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "https://api.github.com/search/users?access_token=" + gitToken + "&q=tansaku")
      //same as doing whenGET
      .respond(
        { items: items }
      );
  }));

  var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
      },
    ];

  it('responds to query', function() {
    expect(search.queryListOfUsers).toBeDefined();
  });

  it('returns search results', function() {
    search.queryListOfUsers('tansaku')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});

describe('factory: SearchUser', function() {
  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(SearchUser) {
    search = SearchUser;
  }));

  var httpBackend;

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "https://api.github.com/users/tansaku?access_token=" + gitToken)
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
    expect(search.queryEachUser).toBeDefined();
  });

  it('returns search results', function() {
    search.queryEachUser('tansaku')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});

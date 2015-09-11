describe('GitHub profile finder', function() {

  var searchBox = element(by.model('searchCtrl.searchTerm'));
  var searchButton = element(by.className('btn'));
  var searchFeedback = element.all(by.css('p')).get(0);
  var searchError = element.all(by.css('p')).get(1);
  var profile_list = element.all(by.repeater('user in searchCtrl.searchResult.items'));
  var profiles = element(by.css('.list-group'));
  var userDetails = element.all(by.css('span'))
  var username = element(by.css('a'))

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title and displays nothing else', function() {
    expect(browser.getTitle()).toEqual('Github user search');
    expect(searchError.isDisplayed()).toBe(false);
  });

  it('can find profiles using a submit button', function() {
    searchBox.sendKeys('adrianw1832');
    searchButton.click();
    expect(username.getText()).toEqual('adrianw1832');
    expect(userDetails.get(0).getText()).toEqual('11 followers');
    expect(userDetails.get(1).getText()).toEqual('28 public repos');
  });

  it('shows the user what they have just searched for', function() {
    searchBox.sendKeys('adrianw1832');
    expect(searchFeedback.getText()).toEqual('Search results for adrianw1832');
  });

  it('displays no results found when none are found', function() {
    searchBox.sendKeys('asdfghjklqwertyuiopzxcvbdsf');
    expect(profile_list).toEqual([]);
    expect(searchError.getText()).toEqual('No results found');
  });

  it('displays no results when search is deleted', function() {
    searchBox.sendKeys('adrianw1832');
    searchBox.clear();
    expect(profiles.isDisplayed()).toBe(false);
  });
});

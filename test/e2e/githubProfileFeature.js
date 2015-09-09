describe('GitHub profile finder', function() {

  var searchBox = element(by.model('searchCtrl.searchTerm'));
  var searchButton = element(by.className('btn'));
  var searchFeedback = element.all(by.css('p')).get(0);
  var searchError = element.all(by.css('p')).get(1);
  var profile_list = element.all(by.repeater('user in searchCtrl.searchResult.items'));
  var profiles = element(by.css('.list-group'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Github user search');
    expect(searchError.isDisplayed()).toBe(false);
    expect(profiles.isDisplayed()).toBe(false);
  });

  it('finds profiles using a submit button', function() {
    searchBox.sendKeys('spike');
    searchButton.click();
    expect(profile_list.get(0).getText()).toEqual('spike');
  });

  it('displays no results found when none are found', function() {
    searchBox.sendKeys('asdfghjklqwertyuiopzxcvbdsf');
    expect(profile_list).toEqual([]);
    expect(searchError.getText()).toEqual('No results found');
  });

  it('displays no results when search is deleted', function() {
    searchBox.sendKeys('test');
    searchBox.clear();
    expect(profiles.isDisplayed()).toBe(false);
  });

  it('shows the user what they have just searched for', function() {
    searchBox.sendKeys('test');
    expect(searchFeedback.getText()).toEqual('Search results for test');
  });
});

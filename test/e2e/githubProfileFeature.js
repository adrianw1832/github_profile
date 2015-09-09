describe('GitHub profile finder', function() {

  var searchBox = element(by.model('searchCtrl.searchTerm'));
  var searchButton = element(by.className('btn'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Github user search');
  });

  it('finds profiles', function() {
    searchBox.sendKeys('spike');
    searchButton.click();
    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(profiles.get(0).getText()).toEqual('spike');
  });

  it('displays no results found when none are found', function() {
    searchBox.sendKeys('asdfghjklqwertyuiopzxcvbdsf');
    var profilesCount = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(profilesCount).toEqual([]);
    expect(element.all(by.css('p')).get(1).getText()).toEqual('No results found');
  });

  it('displays no results when search is deleted', function() {
    searchBox.sendKeys('test');
    searchBox.clear();
    var profiles = element(by.css('.list-group'));
    expect(profiles.isDisplayed()).toBeFalsy();
  });

  it('shows the user what they have just searched for', function() {
    searchBox.sendKeys('test');
    expect(element.all(by.css('p')).get(0).getText()).toEqual('Search results for test');
  });
});

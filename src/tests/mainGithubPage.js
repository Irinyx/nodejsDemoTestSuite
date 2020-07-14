const assert = require('assert')
const HomePage = require("../_pages/HomePage")

describe('Count number of repositories on https://github.com/Ginger-Labs/', () => {
    it('verify title of thepage', () => {
        HomePage.open()
        const title = browser.getTitle()
        assert.strictEqual(title, "Ginger-Labs · GitHub")
    });

    it('count the number of repositories on the page', () => {
        const actualNumberRepo = browser.$$('.py-4.border-bottom').length;
        browser.waitUntil(  () => browser.$('.js-profile-repository-count').getText() !== "")
        let expected = browser.$('.js-profile-repository-count').getText()
        expect(actualNumberRepo).toEqual(+expected)
    });
});
const assert = require('assert')
const HomePage = require("../_pages/HomePage")

describe('count and verify the number of Forks and updated time', () => {

    it('calculate forks', () => {
        HomePage.open()
        browser.$('//summary[@class="btn select-menu-button"]').click()
        browser.$('.select-menu-item=Forks').click()

        const objForkList = browser.$(".org-repos.repo-list")
        objForkList.waitForExist()

        const ActualResult = objForkList.$$('li.fork').length;
        const forksCount = browser.$('.TableObject-item--primary.v-align-top').$$('strong')[0].getText()
        expect(ActualResult).toEqual(+forksCount);
    });

    it('Verify updated time is in descending order', () => {
        const els = browser.$$("div.repo-list relative-time")

        for (let i = 1; i < els.length; i++) {
            const t1 = Date.parse(els[i - 1].getAttribute("datetime"))
            const t2 = Date.parse(els[i].getAttribute("datetime"))
            console.log(t1, t2)
            if (t1 < t2) {
                assert.fail("not sorted")
                break
            }
        }
    });
});
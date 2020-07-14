const assert = require('assert');

describe('Visit GitHub Page and count number of repositories', () => {
    const BASE_URL = 'https://github.com/Ginger-Labs';

    it('Visit GitHub Page', async () => {
        await browser.url(BASE_URL)
        const title = await browser.getTitle()
        assert.strictEqual(title, "Ginger-Labs · GitHub")
    });

    it('count the number of repositiories on the page', () => {
        const actualNumberRepo = browser.$$('.py-4.border-bottom').length;
        browser.waitUntil(  () => browser.$('.js-profile-repository-count').getText() !== "")
        let expected = browser.$('.js-profile-repository-count').getText()
        expect(actualNumberRepo).toEqual(+expected)
    });

    it('calculate forks',  () => {
        browser.$('//summary[@class="btn select-menu-button"]').click()
        browser.$('.select-menu-item=Forks').click()

        const objForkList = browser.$(".org-repos.repo-list")
        objForkList.waitForExist()

        const ActualResult = objForkList.$$('li.fork').length;
        const forksCount = browser.$('.TableObject-item--primary.v-align-top').$$('strong')[0].getText()
        expect(ActualResult).toEqual(+forksCount);
    });

    it('Verify updated time is in descending order',  () => {
        //browser.url(BASE_URL + "?type=fork")
        const els = browser.$$("div.repo-list relative-time")

        for (let i = 1; i < els.length; i++) {
            const t1 = Date.parse(els[i-1].getAttribute("datetime"))
            const t2 = Date.parse(els[i].getAttribute("datetime"))
            console.log(t1, t2)
            if (t1 < t2) {
                assert.fail("not sorted")
                break
            }
        }
    });

    it('bobaguys',  () => {
        const backToAllRepo = browser.$('.UnderlineNav-item.selected').click()
        browser.waitUntil(  () => browser.getUrl() === "https://github.com/Ginger-Labs")

        const search = browser.$('.form-control.width-full').setValue('boba');
        const clickProject = browser.$('=bobabot').click();
        browser.waitUntil(  () => browser.getUrl() === "https://github.com/Ginger-Labs/bobabot")
        const clickCodeBtn = browser.$('.octicon.octicon-download.mr-1').click()

        const t = browser.$('//div[@data-target="get-repo.modal"]')
        t.waitForExist()

        const getCloneLink = browser.$('//input[@class="form-control input-monospace input-sm"]').getAttribute('value')
        expect(getCloneLink).toEqual('https://github.com/Ginger-Labs/bobabot.git');

    });


});
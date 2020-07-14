const HomePage = require("../_pages/HomePage")

describe('Get the clone link from Bobabot repository', () => {
    it('Get the clone link from Bobabot Repo',  () => {
        HomePage.open()
        const search = browser.$('.form-control.width-full')
        search.setValue('boba')

        const clickProject = browser.$('=bobabot')
        clickProject.click()

        browser.waitUntil(  () => browser.getUrl() === 'https://github.com/Ginger-Labs/bobabot')
        const clickCodeBtn = browser.$('.octicon.octicon-download.mr-1')
        clickCodeBtn.click()

        const t = browser.$('//div[@data-target="get-repo.modal"]')
        t.waitForExist()

        const getCloneLink = browser.$('//input[@class="form-control input-monospace input-sm"]').getAttribute('value')
        expect(getCloneLink).toEqual('https://github.com/Ginger-Labs/bobabot.git');
    });
});
const assert = require('assert');

describe('verify Page Title ', () => {
    it('should have valid title', async () => {
        await browser.url(`https://google.com`)
        const title = await browser.getTitle()
        assert.strictEqual(title, "Google")
    });
});

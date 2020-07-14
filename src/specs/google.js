const assert = require('assert');

describe('Google Test Suite', () => {
    it('should have valid title', async () => {
        await browser.url(`https://google.com`)
        const title = await browser.getTitle()
        assert.strictEqual(title, "Google")
    });
});

const Start = require("./Start")

class HomePage extends Start {
    open() {
        super.open('https://github.com/Ginger-Labs/');
    }
}

module.exports = new HomePage()
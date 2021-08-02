const puppeteer = require('puppeteer');
const timeout = require('./util').timeout;
const devices = puppeteer.devices;
const iPhone = devices['iPhone 6'];
const SETTINGS = require('./settings.json');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://seed.futunn.com/');
    await timeout(1000)
    if (page.url().indexOf('passport.futunn.com') !== -1) {
        await page.tap('.switch-pwd-login');
        await page.type('#loginFormWrapper input[name=email]', SETTINGS.futuUid);
        await page.type('#loginFormWrapper input[name=password]', SETTINGS.futuPwd);
        await page.tap('#loginFormWrapper input[type=submit]');
        await timeout(1000);
    }
    await page.waitForSelector('#waterCanvas', {timeout: 5000})
    await timeout(1000)
    await page.tap('#waterCanvas');
    await timeout(5000);
    // 剩余浇水次数角标
    let leftSelector = '.water_num.ng-binding'
    // 剩余时间 "成熟还需2天19小时"
    let leftTimeSelector = '.left-time'
    await browser.close();
})();

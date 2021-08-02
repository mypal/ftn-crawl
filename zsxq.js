const puppeteer = require('puppeteer');
const timeout = require('./util').timeout;
const devices = puppeteer.devices;
const iPhone = devices['iPhone X'];

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

(async () => {
    const browser = await puppeteer.launch({
        userDataDir: './user_data',
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 800
    })
    // await page.emulate(iPhone);
    await page.goto('https://wx.zsxq.com/dweb2/');
    await timeout(5000);
    if (page.url().indexOf('login') !== -1) {
        await page.waitForNavigation();
        await timeout(2000);
    }

    await timeout(5000);
    await browser.close();
})();

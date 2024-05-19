const { Builder, Browser, By } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const { promisify } = require('util');
const MospolytechTimeTablePage = require('../pages/PolyTech');
const TimetablePage = require('../pages/TimetablePage');

const writeFileAsync = promisify(fs.writeFile);



describe('Timetable Page Test', () => {
    let driver;
    let page;
    let timetablePage;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        page = new MospolytechTimeTablePage(driver);
        timetablePage = new TimetablePage(driver);
    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const screenshot = await driver.takeScreenshot();
            const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
            const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
            const fileName = `${testCaseName}-${dateTime}.png`;
            await writeFileAsync(fileName, screenshot, 'base64');
        }
    });

    after(async () => {
        await driver.quit();
    });

    it('should search for a group timetable', async function() {
        this.timeout(10000);
        await page.load();
        await page.clickTimetableLink();
        const header = await page.getMospolytechTimeTablePageTitle();
        assert.strictEqual(header, 'Расписания');
        await page.clickExternalTimetableLink();
        await page.switchToNewTab();
        await timetablePage.searchGroup();
        await timetablePage.openGroup();
        const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        const now = new Date();
        const weekdayIndex = now.getDay() - 1;
        const result = await timetablePage.checkColor(); 
        assert.strictEqual(result[0], weekdays[weekdayIndex]);
    });
});
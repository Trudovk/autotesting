const { Builder, Browser, By } = require('selenium-webdriver');

class MospolytechTimeTablePage {
  constructor(driver) {
    this.driver = driver;
    this.timetableLink = "//a[@href='/obuchauschimsya/raspisaniya/']";
    this.externalTimetableLink = "//a[@href='https://rasp.dmami.ru/']";
  }
  async load() {
    await this.driver.get('https://mospolytech.ru/');
  }
  async clickTimetableLink() {
    await this.clickLink(this.timetableLink);
  }
  async clickExternalTimetableLink() {
    await this.clickLink(this.externalTimetableLink);
  }
  async switchToNewTab(){
    const initialWindowHandle = await this.driver.getWindowHandle();
    const newWindowHandle = await this.driver.wait(async () => {
      const handlesAfterAction = await this.driver.getAllWindowHandles();
      return handlesAfterAction.find(handle => handle !== initialWindowHandle);
    }, 3000);
    if (newWindowHandle) {
      await this.driver.switchTo().window(newWindowHandle);
    }
  }
  async getMospolytechTimeTablePageTitle(){
    return await this.driver.findElement(By.xpath('//h1')).getText();
  }

  async clickLink(xpath) {
    await this.driver.findElement(By.xpath(xpath)).click();
  }
}



module.exports =  MospolytechTimeTablePage;
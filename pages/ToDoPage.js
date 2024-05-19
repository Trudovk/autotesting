const { Builder, By, Browser } = require("selenium-webdriver");

class TodoPage {
  constructor(driver) {
    this.driver = driver;
    this.todoHeader = By.xpath("//h2");
    this.remainingCount = By.xpath("//span[contains(text(),' remaining')]");
    this.todoInput = By.id("sampletodotext");
    this.addButton = By.id("addbutton");
    this.todoItemsDoneFalse = (index) =>
      By.xpath(`//li[${index}]//span[@class='done-false']`);
    this.todoItems = (index) => By.name(`li${index}`);
  }

  async open() {
    await this.driver.get("https://lambdatest.github.io/sample-todo-app/");
  }

  async getHeaderText() {
    const header = await this.driver.findElement(this.todoHeader).getText();
    return header;
  }

  async getRemainingCountText() {
    const text = await this.driver.findElement(this.remainingCount).getText();
    return text;
  }

  async addTodoItem(text) {
    await this.driver.findElement(this.todoInput).sendKeys(text);
    await this.driver.findElement(this.addButton).click();
  }

  async markTodoItemDone(index) {
    await this.driver.findElement(this.todoItems(index)).click();
  }
}

module.exports = TodoPage;

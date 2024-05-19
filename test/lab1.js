const assert = require("assert");
const { Builder, By, Browser } = require("selenium-webdriver");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");
const TodoPage = require("../pages/ToDoPage");

describe("Todo App Functionality", function () {
  let driver;
  let todoPage;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    todoPage = new TodoPage(driver);
    await todoPage.open();
  });

  it("task1", async function () {
    const header = await todoPage.getHeaderText();
    expect(header).to.equal("LambdaTest Sample App");

    let remainingCountText = await todoPage.getRemainingCountText();
    expect(remainingCountText).to.equal("5 of 5 remaining");

    for (let i = 1; i <= 5; i++) {
      await todoPage.markTodoItemDone(i);
    }

    remainingCountText = await todoPage.getRemainingCountText();
    expect(remainingCountText).to.equal("0 of 5 remaining");

    await todoPage.addTodoItem("Кошелев Егор 221-323");

    remainingCountText = await todoPage.getRemainingCountText();
    expect(remainingCountText).to.equal("1 of 6 remaining");

    await todoPage.markTodoItemDone(6);

    remainingCountText = await todoPage.getRemainingCountText();
    expect(remainingCountText).to.equal("0 of 6 remaining");
  });

  after(async function () {
    await driver.quit();
  });
});

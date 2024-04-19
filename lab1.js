const assert = require("assert");
const { Builder, By, Browser } = require("selenium-webdriver");
let total = 5;
let remaining = 5;

async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    const header = await driver.findElement(By.xpath("//h2")).getText();
    assert.equal(header, "LambdaTest Sample App");
    let text = await driver
      .findElement(
        By.xpath(`//span[text()='${remaining} of ${total} remaining']`)
      )
      .getText();
    assert.equal(text, `${remaining} of ${total} remaining`);
    for (let i = 1; i <= total; i++) {
      await driver.findElement(
        By.xpath(`//li[${i}]//span[@class='done-false']`)
      );
      await driver.findElement(By.name(`li${i}`)).click();
      remaining--;
    }
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Кошелев Егор 221-323");
    await driver.findElement(By.id("addbutton")).click();
    total++;
    remaining++;
    let text1 = await driver
      .findElement(
        By.xpath(`//span[text()='${remaining} of ${total} remaining']`)
      )
      .getText();
    assert.equal(text1, `${remaining} of ${total} remaining`);
    await driver.findElement(By.name("li6")).click();
    remaining--;
    let text2 = await driver
      .findElement(
        By.xpath(`//span[text()='${remaining} of ${total} remaining']`)
      )
      .getText();
    assert.equal(text2, `${remaining} of ${total} remaining`);
    await driver.sleep(2000);
  } finally {
    await driver.quit();
  }
}
example();

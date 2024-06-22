import { After, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { ChromiumBrowser, chromium, selectors } from "@playwright/test";
import { MyWorld } from "../steps/playwright.steps";
import { config } from "./config.ts";

let browser: ChromiumBrowser

declare global {
  var browser: ChromiumBrowser
}

setDefaultTimeout(1000 * 3000)

BeforeAll(async function () {
  selectors.setTestIdAttribute("data-test")
})

Before(async function (this: MyWorld) {
  browser = await chromium.launch(config.browserOptions)
  const context = await browser.newContext()
  context.setDefaultTimeout(1000 * 60)
  this.page = await context.newPage()
})

After(async () => {
  await browser.close();
});
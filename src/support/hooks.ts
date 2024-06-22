import { After, Before, BeforeAll } from "@cucumber/cucumber";
import { ChromiumBrowser, chromium } from "@playwright/test";
import { MyWorld } from "../steps/playwright.steps";
import { config } from "./config";

let browser: ChromiumBrowser

declare global {
  var browser: ChromiumBrowser
}

BeforeAll(async function () {
  browser = await chromium.launch(config.browserOptions)
})

Before(async function (this: MyWorld) {
  this.page = await (await browser.newContext()).newPage()
})

After(async () => {
  await browser.close();
});
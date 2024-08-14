import { After, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { ChromiumBrowser, chromium, selectors } from "@playwright/test";
import { config, MyWorld } from "./config.ts";
import dotenv from "dotenv";
import { ApiHelpers } from "./ApiHelpers.ts";
dotenv.config()

let browser: ChromiumBrowser

declare global {
  var browser: ChromiumBrowser
}

setDefaultTimeout(1000 * 60)

BeforeAll(async function () {
  selectors.setTestIdAttribute("data-test")
})

Before(async function (this: MyWorld) {
  browser = await chromium.launch(config.browserOptions)
  const context = await browser.newContext({storageState: 'session-storage.json'})
  context.setDefaultTimeout(1000 * 60)
  this.page = await context.newPage()
})

Before({tags: "@delete and @space"}, async function (this: MyWorld) {
  const request = this.page.request
  await ApiHelpers.postSpaceByName(request, "GUI new space") // FIXME remove plain text
})

After(async () => {
  await browser.close();
});

After({tags: "@create and @doc"}, async function (this: MyWorld) {
  await ApiHelpers.deleteDocsByName(this.page.request, this.newDocName);
})

After({tags: "@create and @space"}, async function(this: MyWorld) {
  const request = this.page.request
  await ApiHelpers.deleteSpaceByName(request, this.newSpaceName)
})

After({tags: "@doc"}, async function(this: MyWorld) {
  const request = this.page.request
  await ApiHelpers.deleteSpaceByName(request, this.newSpaceName)
})
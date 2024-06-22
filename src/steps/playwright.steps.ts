import { Given, Then, World } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";

export interface MyWorld extends World {
  page: Page
}

Given('Go to the main website', async function (this: MyWorld) {
  // Write code here that turns the phrase above into concrete actions
  const page = this.page
  await page.goto("https://playwright.dev")
  await page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' }).waitFor()
});

Given('Change theme to {string} mode', async function (this: MyWorld, mode: string) {
  const page = this.page!
  const html = page.locator('html');
  const current = await html.getAttribute('data-theme');
  if (current !== mode) {
    await page.getByLabel("Switch between dark and light mode").click();
  }
  await page.waitForSelector(`html[data-theme=${mode}]`);
})

Then('We see {string} mode', async function (this: MyWorld, mode: string) {
  const page = this.page!;
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(theme).toEqual(mode);
})
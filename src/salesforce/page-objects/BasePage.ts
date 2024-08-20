import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  container: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.container = this.page.locator("body")
  }
  
  async clickOnButton(buttonName: string, exactText?: boolean) {
    const button = this.container.getByRole("button", { name: buttonName, exact: exactText ?? false });
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async scrollToHeading(headingName: string) {
    await this.page.getByRole("heading", { name: headingName }).scrollIntoViewIfNeeded();
  }

  async waitForStopProcessing() {
    await this.container.locator("lightning-spinner").waitFor({ state: "hidden", timeout: 7000 })
  }

  getButtonByName(buttonName: string): Locator {
    return this.page.getByRole("button", { name: buttonName })
  }

  async assertPageUrlIsCorrect(expectedUrl: string | RegExp) {
    await expect(this.page).toHaveURL(expectedUrl, {timeout: 1000 * 10});
  }

  async assertButtonIsNotDisplayed(buttonName: string) {
    await expect(this.page.getByRole("button", { name: buttonName, exact: true })).toBeHidden();
  }

  async clickKeyboardKey(key: string) {
    await this.container.press(key)
  }
}

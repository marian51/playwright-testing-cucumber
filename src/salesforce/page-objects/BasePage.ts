import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  container: any | Locator;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async clickOnButton(buttonName: string, exactText?: boolean) {
    await this.container.getByRole("button", { name: buttonName, exact: exactText ?? false }).click();
  }

  async scrollToHeading(headingName: string) {
    await this.page.getByRole("heading", { name: headingName }).scrollIntoViewIfNeeded();
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

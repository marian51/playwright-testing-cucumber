import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  container: any | Locator;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async clickOnButton(buttonName: string) {
    await this.container.getByRole("button", { name: buttonName }).click();
  }

  async assertPageUrlIsCorrect(expectedUrl: string | RegExp) {
    await expect(this.page).toHaveURL(expectedUrl, {timeout: 1000 * 10});
  }
}

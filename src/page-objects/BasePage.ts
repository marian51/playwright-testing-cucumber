import { Page, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertPageUrlIsCorrect(expectedUrl: string | RegExp) {
    await expect(this.page).toHaveURL(expectedUrl, {timeout: 1000 * 10});
  }
}

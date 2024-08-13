import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class AllDocsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("cu-hub-content");
  }

  async assertDocIsNotVisibleOnList(docName: string) {
    const element: Locator = this.container.locator("cu-document-name-cell").filter({ hasText: new RegExp(`^${docName}$`) });
    await this.container.waitFor();
    await this.page.waitForTimeout(5000)
    await expect(element).toBeHidden();
  }
}
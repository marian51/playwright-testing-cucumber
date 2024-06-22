import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class LeftSideMenu extends BasePage {

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("cu-simple-bar");
  }

  async clickOnElement(elementName: string) {
    await this.container.getByRole("treeitem", { name: elementName }).click();
  }

  async assertElementIsVisible(elementName: string) {
    const element = this.container.getByRole("treeitem", { name: elementName });
    await expect(element).toBeVisible();
  }
}

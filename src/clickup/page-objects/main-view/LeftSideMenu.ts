import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class LeftSideMenu extends BasePage {
  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("cu-simple-bar");
  }

  async clickOnElement(elementName: string, mouseKey: string = "left") {
    await this.container.getByRole("treeitem", { name: elementName }).click({ button: mouseKey });
  }

  async clickOnMenuLabel(labelName: string, mouseKey: string = "left") {
    await this.container.getByTestId("simple-bar__item-label").filter({ hasText: labelName }).click({ button: mouseKey });
  } 

  async assertElementIsVisible(elementName: string) {
    const element = this.container.getByRole("treeitem", { name: elementName });
    await expect(element).toBeVisible();
  }

  async assertElementIsNotVisible(elementName: string) {
    const element = this.container.getByRole("treeitem", { name: elementName });
    await expect(element).toBeHidden();
  }
}

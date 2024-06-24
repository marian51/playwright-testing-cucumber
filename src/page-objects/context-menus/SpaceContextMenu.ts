import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class SpaceContextMenu extends BasePage {
  
  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("project-menu__controls");
  }
  
  async clickOnOption(optionName: string) {
    const menuOption: Locator = this.container.getByRole("link", { name: optionName });
    await menuOption.click();
  }
}
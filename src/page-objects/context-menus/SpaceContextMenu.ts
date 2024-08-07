import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class SpaceContextMenu extends BasePage {

  elementType: string;
  
  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("project-menu__controls");
    this.elementType = "link";
  }
  
  async clickOnOption(optionName: string) {
    const menuOption: Locator = this.container.getByRole(this.elementType, { name: optionName });
    await menuOption.click();
  }
}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class DocContextMenu extends BasePage {

  elementType: string;
  
  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("dropdown__menu__sidebar");
    this.elementType = "button";
  }
  
  async clickOnOption(optionName: string) {
    const menuOption: Locator = this.container.getByRole(this.elementType, { name: optionName });
    await menuOption.click();
  }
}
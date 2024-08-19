import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CasesView extends BasePage {

  private readonly casesTable: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("#brandBand_1");
    this.casesTable = this.container.getByRole("grid")
  }

}
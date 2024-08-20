import { Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class ConfirmSettlementDialog extends BasePage {
  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("c-lwc-business-trip-actions section");
  }
}

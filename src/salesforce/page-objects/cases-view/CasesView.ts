import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CasesView extends BasePage {

  private readonly casesTable: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("#brandBand_1");
    this.casesTable = this.container.getByRole("grid")
  }

  async openDelegationWithStatus(statusName: string) {
    await this.casesTable.locator("tbody").getByRole('gridcell', { name: statusName }).locator("xpath=..").locator("th").click();
  }

  async checkThatThereIsCaseWithStatus(statusName: string) {
    try {
      await this.casesTable.getByRole('gridcell', { name: 'Needs Manager Approval' }).first().waitFor({ timeout: 5000 });
    } catch (error) {
      throw new Error(`Cases table has not been loaded, probably there are no cases with '${statusName}'available!`)
    }
  }
}
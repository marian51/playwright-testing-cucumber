import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CasesView extends BasePage {
  private readonly casesTable: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("#brandBand_1");
    this.casesTable = this.container.getByRole("grid");
  }

  async openDelegationWithStatus(statusName: string) {
    await this.casesTable.locator("tbody").getByRole("gridcell", { name: statusName }).locator("xpath=..").locator("th").first().click();
  }

  async openDelegationByNumber(delegationNumber: number) {
    await this.casesTable.locator("tbody").locator("tr").nth(delegationNumber - 1).locator("th").click();
  }

  async selectView(selectedView: string) {
    await this.container.locator("h1").click();
    await this.page.getByPlaceholder("Search lists...").click();
    await this.page.getByPlaceholder("Search lists...").fill(selectedView);
    await this.page.getByRole("option", { name: selectedView }).click();
  }

  async filterView(filterText: string) {
    await this.page.getByPlaceholder('Search this list...').fill(filterText);
    await this.clickKeyboardKey("Enter");
    await this.page.waitForTimeout(5000);
  }

  async checkThatThereIsCaseWithStatus(statusName: string) {
    try {
      await this.casesTable.getByRole("gridcell", { name: "Needs Manager Approval" }).first().waitFor({ timeout: 5000 });
    } catch (error) {
      throw new Error(`Cases table has not been loaded, probably there are no cases with '${statusName}'available!`);
    }
  }
}

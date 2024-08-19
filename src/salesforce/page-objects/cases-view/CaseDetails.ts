import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CaseDetails extends BasePage {
  private readonly tabName: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("#brandBand_2");
    this.tabName = this.container.locator("records-entity-label");
  }

  async waitForCaseDetailsView() {
    await this.container.waitFor({ timeout: 5000 });
  }

  async assertCaseDetailsViewIsLoaded() {
    await expect(this.container).toBeVisible({ timeout: 10000 });
    await expect(this.tabName).toHaveText("Case");
    await expect(this.getButtonByName("Reject")).toBeVisible();
  }

  async assertCaseDetailsAreAsExpected(dataTable: { Field: string; Value: string }[]) {
    for (const element of dataTable) {
      if (["Status"].includes(element.Field)) continue;
      if (element.Field === "Traveler") element.Value = process.env.SF_TEST_SANDBOX_USER as string
      if (element.Field === "Accommodation") element.Value = process.env.SF_TEST_SANDBOX_ACCOMMODATION as string
      if (["Start Date", "End Date"].includes(element.Field)) element.Value = element.Value + " 12:00";
      if (element.Field === "Subject")
        element.Value = `${process.env.SF_TEST_SANDBOX_USER} - ${dataTable.filter((e) => e.Field === "Place Of Arrival")[0].Value} - ${dataTable.filter((e) => e.Field === "Start Date")[0].Value.replaceAll(".", "-")} - ${dataTable.filter((e) => e.Field === "End Date")[0].Value.replaceAll(".", "-")}`;
      const locator = ["Engine Capacity [cm3]", "Distance [km]"].includes(element.Field)
        ? "lightning-formatted-number"
        : ["Project", "Traveler"].includes(element.Field)
          ? "records-hoverable-link a"
          : "lightning-formatted-text";

      const label = this.page.getByText(element.Field, { exact: true });
      const parent = this.page.locator("dt", { has: label }).locator("xpath=..");
      const target = parent.locator("dd").locator(locator);

      await target.scrollIntoViewIfNeeded();

      await expect(target).toHaveText(element.Value);

      await target.evaluate((element) => (element.style.backgroundColor = "yellow"));
    }
  }
}

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

  async selectStatusByName(statusName: string) {
    await this.container.getByTitle(statusName, { exact: true }).click();
  }

  async saveValueFromField(fieldName: string): Promise<string> {
    const label = this.page.getByText(fieldName, { exact: true });
    const parent = this.page.locator("dt", { has: label }).locator("xpath=..");
    const target = parent.locator("dd").first();

    await target.scrollIntoViewIfNeeded();
    return await target.innerText();
  }

  async clickOnTab(tabName: string) {
    await this.container.getByRole("tab", { name: tabName }).scrollIntoViewIfNeeded();
    await this.container.getByRole("tab", { name: tabName }).click();
  }

  async addNewEntryInSection(sectionName: string) {
    const section = this.page.getByText(sectionName, { exact: true });
    await section.scrollIntoViewIfNeeded();
    await this.page.getByLabel(sectionName).getByRole("button", { name: "New" }).click();
  }

  async checkThatCostIsAdded(costName: string) {
    await this.container.getByLabel("Business Trip Costs").getByRole("link", { name: costName }).waitFor({ timeout: 5000 });
  }

  async assertCaseDetailsViewIsLoaded() {
    await expect(this.container).toBeVisible({ timeout: 10000 });
    await expect(this.tabName).toHaveText("Case");
    await expect(this.getButtonByName("Reject")).toBeVisible();
  }

  async assertCaseDetailsAreAsExpected(dataTable: { Field: string; Value: string }[]) {
    for (const element of dataTable) {
      if (["Status"].includes(element.Field)) continue;
      if (element.Field === "Traveler") element.Value = process.env.SF_TEST_SANDBOX_USER as string;
      if (element.Field === "Accommodation") element.Value = process.env.SF_TEST_SANDBOX_ACCOMMODATION as string;
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

  async assertStatusIsAsExpected(statusName: string) {
    const label = this.page.getByText("Status", { exact: true });
    const parent = this.page.locator("dt", { has: label }).locator("xpath=..");
    const target = parent.locator("dd").locator("lightning-formatted-text");

    await expect(target).toHaveText(statusName);
    await target.evaluate((element) => (element.style.backgroundColor = "yellow"));
    await expect(this.page.getByTitle(statusName).locator("xpath=..")).toHaveCSS("background-color", "rgb(1, 68, 134)");
  }

  async assertStatusInStatusesBar(statusName: string) {
    const status = this.container.getByTitle(statusName);
    const color = statusName === "Closed" ? "rgb(46, 132, 74)" : "rgb(1, 68, 134)";
    await expect(status).toHaveAttribute("aria-selected", "true");
    await expect(status.locator("xpath=..")).toHaveCSS("background-color", color);
  }

  async assertCaseSettlementFieldsAreAsExpected(dataTable: any) {
    for (const element of dataTable) {
      if (element.Value === "checked") {
        const label = this.page.getByText(element.Field, { exact: true });
        const parent = this.page.locator("dt", { has: label }).locator("xpath=..");
        const target = parent.locator("dd").locator("lightning-input");

        await target.scrollIntoViewIfNeeded();

        await expect(target).toHaveAttribute(element.Value);
        await target.evaluate((e) => (e.style.backgroundColor = "yellow"));
        continue;
      }

      const label = this.page.getByText(element.Field, { exact: true });
      const parent = this.page.locator("dt", { has: label }).locator("xpath=..");
      const target = parent.locator("dd").locator("lightning-formatted-text");

      await target.scrollIntoViewIfNeeded();

      await expect(target).toHaveText(element.Value);
      await target.evaluate((element) => (element.style.backgroundColor = "yellow"));
    }
  }

  async assertDistributedCosts() {
    let label = this.page.getByText(process.env.SF_TEST_SANDBOX_COMPANY_1 as string, { exact: true });
    let parent = this.page.locator("dt", { has: label }).locator("xpath=..");
    let targetFirst: string | number = parseFloat(
      (await parent.locator("dd").locator("lightning-formatted-text").innerText()).split(" ")[0].replace(",", ".")
    );

    await parent.scrollIntoViewIfNeeded();
    await parent.evaluate((e) => (e.style.backgroundColor = "yellow"));

    label = this.page.getByText(process.env.SF_TEST_SANDBOX_COMPANY_2 as string, { exact: true });
    parent = this.page.locator("dt", { has: label }).locator("xpath=..");
    let targetSecond: number = parseFloat(
      (await parent.locator("dd").locator("lightning-formatted-text").innerText()).split(" ")[0].replace(",", ".")
    );

    await parent.evaluate((e) => (e.style.backgroundColor = "yellow"));

    expect(targetFirst).toEqual(targetSecond * 2);
  }
}

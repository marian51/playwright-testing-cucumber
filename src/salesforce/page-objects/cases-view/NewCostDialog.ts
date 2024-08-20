import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { COST_FORM } from "../../helpers/StepsHelpers.ts";
import { MyWorld } from "../../../support/config.ts";

export class NewCostDialog extends BasePage {
  caseTypeSelect: Locator | undefined;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByRole("dialog")
  }

  async selectCaseType(caseType: string) {
    this.caseTypeSelect = this.container.getByText(caseType);
    await this.caseTypeSelect.click();
  }

  async fillFormWithData(dataTable: any, world: MyWorld) {
    for (const element of dataTable) {
      if (COST_FORM.TEXT_FIELDS.includes(element.Field)) {
        if (element.Field === "Amount") element.Value = world.savedValue;
        const target = this.container.getByLabel(`${element.Field}`, { exact: false });
        await target.fill(element.Value);
        continue;
      }

      if (COST_FORM.DROPDOWN_SELECT.includes(element.Field)) {
        if (element.Value === "Sandbox_Company") element.Value = process.env.SF_TEST_SANDBOX_COMPANY;
        await this.container.getByRole("combobox", { name: new RegExp(`^${element.Field}$`) }).click();
        await this.container.getByRole("listbox", { name: element.Field }).getByTitle(element.Value, { exact: true }).click();
        continue;
      }
    }
  }
}
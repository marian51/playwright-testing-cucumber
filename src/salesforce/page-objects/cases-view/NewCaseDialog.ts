import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { DELEGATION_FORM } from "../../helpers/StepsHelpers.ts";

export class NewCaseDialog extends BasePage {
  caseTypeSelect: Locator | undefined;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByRole("dialog");
  }

  async selectCaseType(caseType: string) {
    this.caseTypeSelect = this.page.getByText(caseType);
    await this.caseTypeSelect.click();
  }

  async fillFormWithData(dataTable: any) {
    for (const element of dataTable) {
      if (DELEGATION_FORM.TEXT_FIELDS.includes(element.Field)) {
        const target = this.container.getByLabel(`${element.Field}`, { exact: false });
        await target.fill(element.Value);
        continue;
      }

      if (DELEGATION_FORM.DROPDOWN_SELECT.includes(element.Field)) {
        if (element.Field === "Accommodation") element.Value = process.env.SF_TEST_SANDBOX_ACCOMMODATION;
        await this.container.getByRole("combobox", { name: new RegExp(`^${element.Field}$`) }).click();
        await this.container.getByRole("listbox", { name: element.Field }).getByTitle(element.Value, { exact: true }).click();
        continue;
      }

      if (DELEGATION_FORM.DATE_PICKERS.includes(element.Field)) {
        const target = this.container.getByRole("group", { name: element.Field }).getByLabel("*Date");
        await target.click();
        await target.fill(element.Value);
        continue;
      }

      if (DELEGATION_FORM.SEARCH_SELECT.includes(element.Field)) {
        const input = this.container.getByLabel(element.Field);
        element.Value = element.Field === "Traveler" ? process.env.SF_TEST_SANDBOX_USER : element.Value;
        await input.click();
        await input.fill(element.Value);

        await this.container.locator("//ul[@role='group']").getByRole("option", { name: element.Value, exact: false }).click();
        continue;
      }
    }
  }
}

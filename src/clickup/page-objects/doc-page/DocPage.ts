import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class DocPage extends BasePage {

  private readonly titleInput: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("dashboard-doc-main__container");
    this.titleInput = this.container.getByTestId("editable__input");
  }

  async typeIntoTitleInput(text: string) {
    await this.titleInput.fill(text);
  }
}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CreateSpaceModal extends BasePage {
  private readonly nameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("modal__dialog");
    this.nameInput = this.container.getByTestId("create-space-details__input").first();
  }

  async waitForContainerLoad() {
    await this.container.waitFor();
  }

  async waitForContainerDisappear() {
    await this.container.waitFor({ state: "detached" });
  }

  async typeIntoNameInput(text: string) {
    await this.nameInput.fill(text);
  }
}

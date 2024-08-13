import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class DeleteSpaceModal extends BasePage {
  private readonly spaceNameInput: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page)
    this.container = this.page.getByTestId("modal__dialog");
    this.spaceNameInput = this.container.getByRole("textbox");
    this.deleteButton = this.container.getByTestId("confirmation-modal__confirm-button");
  }

  async typeSpaceName(spaceName: string) {
    await this.spaceNameInput.fill(spaceName);
  }

  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }

  async waitForDeleting() {
    await this.container.waitFor({ state: "detached" });
  }
}
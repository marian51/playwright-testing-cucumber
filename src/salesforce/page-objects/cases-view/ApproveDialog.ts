import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class ApproveDelegationDialog extends BasePage {

  private readonly commentTextBox: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator(".spinner-wrapper");
    this.commentTextBox = this.container.getByLabel('Comments');
  }

  async fillCommentTextBox() {
    await this.commentTextBox.fill("This is example of the comment.")
  }
}
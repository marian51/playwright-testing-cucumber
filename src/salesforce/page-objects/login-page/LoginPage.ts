import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class LoginPage extends BasePage {
  private readonly logo: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.locator("body")
    this.logo = this.container.locator("#logo");
    this.usernameInput = this.container.getByLabel("Username");
    this.passwordInput = this.container.getByLabel("Password");
  }

  async waitForLogo() {
    await this.logo.waitFor();
  }

  async typeIntoUsernameInput(text: string) {
    await this.usernameInput.fill(text);
  }

  async typeIntoPasswordInput(text: string) {
    await this.passwordInput.fill(text);
  }
}

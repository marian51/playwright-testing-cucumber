import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export default class LoginPage extends BasePage {
  private readonly mainContainer: Locator;
  private readonly loginEmailInput: Locator;
  private readonly loginPasswordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainContainer = this.page.getByTestId("login__main-container");
    this.loginEmailInput = this.mainContainer.getByTestId("login-email-input");
    this.loginPasswordInput = this.mainContainer.getByTestId("login-password-input");
    this.submitButton = this.mainContainer.getByRole("button", { name: "Log in" });
  }

  async goToLoginPage() {
    await this.page.goto("https://app.clickup.com/");
    await this.mainContainer.waitFor();
    await this.page.screenshot({path: "playwright-report/1.png"})
  }

  async typeIntoLoginInput(text: string) {
    await this.page.screenshot({path: "playwright-report/2.png"})
    await this.loginEmailInput.fill(text);
  }

  async typeIntoPasswordInput(text: string) {
    await this.loginPasswordInput.fill(text);
  }

  async clickOnSubmitButton() {
    await this.submitButton.click();
  }
}

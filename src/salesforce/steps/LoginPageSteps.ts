import { Given } from "@cucumber/cucumber";
import { LoginPage } from "../page-objects/login-page/LoginPage.ts";
import { MyWorld } from "../../support/config.ts";
import { USERS } from "../helpers/StepsHelpers.ts";

let loginPage: LoginPage;

Given('Salesforce application is opened', async function (this: MyWorld) {
  loginPage = new LoginPage(this.page);

  await this.page.goto(process.env.SF_LOGIN_URL as string);
  await loginPage.waitForLogo();
})

Given(/^User is logged to the Salesforce application$/, async function (this: MyWorld)  {
  await loginPage.typeIntoUsernameInput(process.env.SF_TEST_USERNAME as string);
  await loginPage.typeIntoPasswordInput(process.env.SF_TEST_PASSWORD as string);
  await loginPage.clickOnButton("Log In to Sandbox");

  await this.page.waitForURL(process.env.SF_MAIN_VIEW_URL as string);
})

Given("User is logged to the Salesforce application as {string} user", async function (this: MyWorld, userType: string) {
  await loginPage.typeIntoUsernameInput(USERS[userType].USERNAME as string);
  await loginPage.typeIntoPasswordInput(USERS[userType].PASSWORD as string);
  await loginPage.clickOnButton("Log In to Sandbox");

  await this.page.waitForURL(process.env.SF_MAIN_VIEW_URL as string);
})
import { Given, Then, When } from "@cucumber/cucumber";
// import { LoginPage } from "../../page-objects/login-page/LoginPage";
import { MyWorld } from "../playwright.steps";
import LoginPage from "../../page-objects/login-page/LoginPage.ts";

let loginPage: LoginPage;

Given("Login page is open", async function (this: MyWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goToLoginPage();
});

When("User logs with correct credentials", async () => {
  await loginPage.typeIntoLoginInput(process.env.TEST_USERNAME as string);
  await loginPage.typeIntoPasswordInput(process.env.TEST_PASSWORD as string);
  await loginPage.clickOnSubmitButton();
});

Then("User is logged to the application", async () => {
  await loginPage.assertPageUrlIsCorrect(/https:\/\/app.clickup.com\/\d+\/*/);
});

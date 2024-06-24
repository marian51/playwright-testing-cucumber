import { Given, Then, When } from "@cucumber/cucumber";
// import { LoginPage } from "../../page-objects/login-page/LoginPage";
import { MyWorld } from "../playwright.steps";
import LoginPage from "../../page-objects/login-page/LoginPage.ts";
import { LeftSideMenu } from "../../page-objects/main-view/LeftSideMenu.ts";
import { CreateSpaceModal } from "../../page-objects/modals/CreateSpaceModal.ts";

let loginPage: LoginPage, leftSideMenu: LeftSideMenu, createSpaceModal: CreateSpaceModal;

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

Given("A {string} modal window is open", async function (this: MyWorld, s: string) {
  leftSideMenu = new LeftSideMenu(this.page);
  createSpaceModal = new CreateSpaceModal(this.page);

  await leftSideMenu.clickOnElement(s);
  await createSpaceModal.waitForContainerLoad();
});

When("User types {string} in new space input", async function (this: MyWorld, newSpaceName: string) {
  await createSpaceModal.typeIntoNameInput(newSpaceName);
  this.newSpaceName = newSpaceName
});

When("User clicks {string} button in new space modal window", async function (this: MyWorld, buttonName: string) {
  await createSpaceModal.clickOnButton(buttonName);
});

Then("New space with {string} name is displayed on left side menu", async function (this: MyWorld, newSpaceName: string) {
  await leftSideMenu.assertElementIsVisible(newSpaceName);
});

import { Given, Then, When } from "@cucumber/cucumber";
// import { LoginPage } from "../../page-objects/login-page/LoginPage";
import { MyWorld } from "../playwright.steps";
import LoginPage from "../../page-objects/login-page/LoginPage.ts";
import { LeftSideMenu } from "../../page-objects/main-view/LeftSideMenu.ts";
import { CreateSpaceModal } from "../../page-objects/modals/CreateSpaceModal.ts";
import { SpaceContextMenu } from "../../page-objects/context-menus/SpaceContextMenu.ts";
import { DeleteSpaceModal } from "../../page-objects/modals/DeleteSpaceModal.ts";
import { waitAndCloseSearchPopup, waitForPageLoad } from "../../support/GuiHelpers.ts";

let loginPage: LoginPage,
  leftSideMenu: LeftSideMenu,
  createSpaceModal: CreateSpaceModal,
  spaceContextMenu: SpaceContextMenu,
  deleteSpaceModal: DeleteSpaceModal;

Given("Login page is open", async function (this: MyWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.goToLoginPage();
});

Given("A {string} modal window is open", async function (this: MyWorld, s: string) {
  leftSideMenu = new LeftSideMenu(this.page);
  createSpaceModal = new CreateSpaceModal(this.page);

  await leftSideMenu.clickOnElement(s);
  await createSpaceModal.waitForContainerLoad();
});

Given("A space with name {string} is open", async function (this: MyWorld, spaceName: string) {
  leftSideMenu = new LeftSideMenu(this.page);
  await leftSideMenu.clickOnElement(spaceName);
});

Given('Application is opened', async function (this: MyWorld) {
  await this.page.goto("https://app.clickup.com/")
  loginPage = new LoginPage(this.page);
})

When("User logs with correct credentials", async () => {
  await loginPage.typeIntoLoginInput(process.env.TEST_USERNAME as string);
  await loginPage.typeIntoPasswordInput(process.env.TEST_PASSWORD as string);
  await loginPage.clickOnSubmitButton();
});

When("User clicks by {string} click on {string} in left side menu", async function (this: MyWorld, mouseKey: string, elementName: string) {
  await leftSideMenu.clickOnElement(elementName, mouseKey);
});

When("User choose {string} option from space context menu", async function (this: MyWorld, menuOption: string) {
  spaceContextMenu = spaceContextMenu ?? new SpaceContextMenu(this.page);
  await spaceContextMenu.clickOnOption(menuOption);
});

When("User types {string} in space name input in 'Delete space' modal window", async function (this: MyWorld, spaceName: string) {
  deleteSpaceModal = deleteSpaceModal ?? new DeleteSpaceModal(this.page);
  await deleteSpaceModal.typeSpaceName(spaceName);
});

When("User clicks {string} button on 'Delete space' modal window", async function (this: MyWorld, buttonName: string) {
  await deleteSpaceModal.clickOnButton(buttonName);
});

Then("User is logged to the application", async () => {
  await loginPage.assertPageUrlIsCorrect(/https:\/\/app.clickup.com\/\d+\/*/);
});

When("User types {string} in new space input", async function (this: MyWorld, newSpaceName: string) {
  await createSpaceModal.typeIntoNameInput(newSpaceName);
  this.newSpaceName = newSpaceName;
});

When("User clicks {string} button in new space modal window", async function (this: MyWorld, buttonName: string) {
  await createSpaceModal.clickOnButton(buttonName);
});

Then("New space with {string} name is displayed on left side menu", async function (this: MyWorld, newSpaceName: string) {
  await leftSideMenu.assertElementIsVisible(newSpaceName);
});

Then("Element with {string} name is not displayed on lef side menu", async function (this: MyWorld, elementName: string) {
  await leftSideMenu.assertElementIsNotVisible(elementName);
});

Then("Application is ready to test", async function (this: MyWorld) {
  await waitForPageLoad(this.page);
  await waitAndCloseSearchPopup(this.page);
});

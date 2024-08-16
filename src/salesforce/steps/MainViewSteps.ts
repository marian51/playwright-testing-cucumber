import { Then, When } from "@cucumber/cucumber";
import { MainView } from "../page-objects/main-view/MainView.ts";
import { MyWorld } from "../../support/config.ts";

let mainView: MainView;

When("Main view of Salesforce application is loaded", async function (this: MyWorld) {
  mainView = new MainView(this.page);

  await mainView.waitForWidgetsSection();
});

When('User clicks on {string} tab', async function (this: MyWorld, tabName: string) {
  await mainView.clickOnTab(tabName);
})

When("User clicks on {string} navigation button", async function (this: MyWorld, buttonName: string) {
  await mainView.clickOnButton(buttonName);
})

Then("The following tabs are displayed", async function (this: MyWorld, table: any) {
  await mainView.assertNavigationTabsAreVisible(table.hashes(), false);
});

Then('The following tabs are displayed in tabs dropdown', async function (this: MyWorld, table: any) {
  await mainView.assertNavigationTabsAreVisible(table.hashes(), true);
})

Then("The main view changes", async function (this: MyWorld) {
  await mainView.assertMainViewChanges();
})

Then("The {string} header is displayed", async function (this: MyWorld, tabName: string) {
  await mainView.assertTabNameIsDisplayed(tabName);
})
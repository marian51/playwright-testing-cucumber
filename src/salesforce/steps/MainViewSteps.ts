import { Then, When } from "@cucumber/cucumber";
import { MainView } from "../page-objects/main-view/MainView.ts";
import { MyWorld } from "../../support/config.ts";

let mainView: MainView;

When("Main view of Salesforce application is loaded", async function (this: MyWorld) {
  mainView = new MainView(this.page);

  await mainView.waitForWidgetsSection();
});

Then("The following tabs are displayed", async function (this: MyWorld, table: any) {
  await mainView.assertNavigationTabsAreVisible(table.hashes());
});

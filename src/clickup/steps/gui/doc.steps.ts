import { Given, Then, When } from "@cucumber/cucumber";
import { LeftSideMenu } from "../../page-objects/main-view/LeftSideMenu.ts";
import { MyWorld } from "../playwright.steps.ts";
import { SpaceContextMenu } from "../../page-objects/context-menus/SpaceContextMenu.ts";
import { SpaceCreateNewContextMenu } from "../../page-objects/context-menus/SpaceCreateNewContextMenu.ts";
import { DocPage } from "../../page-objects/doc-page/DocPage.ts";
import { ApiHelpers } from "../../../support/ApiHelpers.ts";

let leftSideMenu: LeftSideMenu,
    spaceContextMenu: SpaceContextMenu,
    spaceCreateNewContextMenu: SpaceCreateNewContextMenu,
    docPage: DocPage;

Given("A new doc is created in basic space", async function (this: MyWorld) {
  leftSideMenu = new LeftSideMenu(this.page);
  spaceContextMenu = new SpaceContextMenu(this.page);
  spaceCreateNewContextMenu = new SpaceCreateNewContextMenu(this.page);

  await leftSideMenu.clickOnElement("GUI new space", "right")
  await spaceContextMenu.clickOnOption("Create new");
  await spaceCreateNewContextMenu.clickOnOption("Doc");
})

When("Basic space for tests is created", async function (this: MyWorld) {
  const basicSpaceName: string = "GUI new space";
  const request = this.page.request;
  await ApiHelpers.postSpaceByName(request, basicSpaceName)
  this.newSpaceName = basicSpaceName
})

When("User saves new doc with {string} name", async function (this: MyWorld, newDocName: string) {
  docPage = new DocPage(this.page);
  docPage.typeIntoTitleInput(newDocName);
  docPage.clickKeyboardKey("Enter");

  this.newDocName = newDocName;
})

Then("New doc with {string} name is displayed on left side menu", async function (this: MyWorld, newDocName: string) {
  await leftSideMenu.assertElementIsVisible(newDocName);
});

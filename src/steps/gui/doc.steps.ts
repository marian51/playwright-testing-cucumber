import { Given, Then, When } from "@cucumber/cucumber";
import { LeftSideMenu } from "../../page-objects/main-view/LeftSideMenu.ts";
import { MyWorld } from "../playwright.steps.ts";
import { ApiHelpers } from "../../support/ApiHelpers.ts";
import { SpaceContextMenu } from "../../page-objects/context-menus/SpaceContextMenu.ts";
import { SpaceCreateNewContextMenu } from "../../page-objects/context-menus/SpaceCreateNewContextMenu.ts";
import { DocPage } from "../../page-objects/doc-page/DocPage.ts";
import { DocContextMenu } from "../../page-objects/context-menus/DocContextMenu.ts";
import { AllDocsPage } from "../../page-objects/all-docs-page/AllDocsPage.ts";

let leftSideMenu: LeftSideMenu,
    spaceContextMenu: SpaceContextMenu,
    spaceCreateNewContextMenu: SpaceCreateNewContextMenu,
    docPage: DocPage,
    docContextMenu: DocContextMenu,
    allDocsPage: AllDocsPage;

Given("A new doc is created in basic space", async function (this: MyWorld) {
  leftSideMenu = new LeftSideMenu(this.page);
  spaceContextMenu = new SpaceContextMenu(this.page);
  spaceCreateNewContextMenu = new SpaceCreateNewContextMenu(this.page);

  await leftSideMenu.clickOnElement("GUI new space", "right")
  await spaceContextMenu.clickOnOption("Create new");
  await spaceCreateNewContextMenu.clickOnOption("Doc");
})

Given("A doc with {string} name exists in basic space", async function (this: MyWorld, newDocName: string) {
  leftSideMenu = new LeftSideMenu(this.page)

  await ApiHelpers.postDocByName(this.page.request, this.newSpaceName, newDocName)
  await leftSideMenu.clickOnElement(this.newSpaceName)
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

When("User clicks on {string} element on left menu by {string} mouse button", async function (this: MyWorld, elementName: string, mouseButton: string) {
  console.log(mouseButton)
  leftSideMenu = new LeftSideMenu(this.page);
  await leftSideMenu.clickOnElement(elementName, mouseButton);
})

When("User choose {string} option in doc context menu", async function (this: MyWorld, optionName: string) {
  docContextMenu = new DocContextMenu(this.page);
  await docContextMenu.clickOnOption(optionName);
})

Then("New doc with {string} name is displayed on left side menu", async function (this: MyWorld, newDocName: string) {
  await leftSideMenu.assertElementIsVisible(newDocName);
});

Then("Doc with {string} is not displayed on left side menu", async function (this: MyWorld, docName: string) {
  await leftSideMenu.assertElementIsNotVisible(docName);
})

Then("Doc with {string} is not listed in docs list", async function (this: MyWorld, docName: string) {
  allDocsPage = new AllDocsPage(this.page);

  await leftSideMenu.clickOnMenuLabel("Docs");
  console.log("User went to Docs page")
  await allDocsPage.assertDocIsNotVisibleOnList(docName);
  console.log("Doc is not listed")
})
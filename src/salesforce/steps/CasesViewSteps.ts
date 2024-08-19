import { Given, Then, When } from "@cucumber/cucumber";
import { MyWorld } from "../../support/config";
import { CasesView } from "../page-objects/cases-view/CasesView.ts";
import { NewCaseDialog } from "../page-objects/cases-view/NewCaseDialog.ts";
import { CaseDetails } from "../page-objects/cases-view/CaseDetails.ts";
import { ApproveDelegationDialog } from "../page-objects/cases-view/ApproveDialog.ts";

let casesView: CasesView, newCaseDialog: NewCaseDialog, caseDetails: CaseDetails, approveDelegationDialog: ApproveDelegationDialog;

Given("There is at least one existing delegation with {string} status", async function (this: MyWorld, statusName: string) {
  casesView = new CasesView(this.page);
  await casesView.checkThatThereIsCaseWithStatus(statusName);
})

When("User clicks on {string} button in Cases view", async function (this: MyWorld, buttonName: string) {
  casesView = new CasesView(this.page);
  await casesView.clickOnButton(buttonName);
})

When("User selects {string} delegation type", async function (this: MyWorld, caseType: string) {
  newCaseDialog = new NewCaseDialog(this.page);
  await newCaseDialog.selectCaseType(caseType);
})

When("User clicks on {string} button in New Case dialog", async function (this: MyWorld, buttonName: string) {
  await newCaseDialog.clickOnButton(buttonName, true);
})

When("User provides delegation information in {string} section as below", async function (this: MyWorld, sectionName: string, dataTable: any) {
  await newCaseDialog.scrollToHeading(sectionName);
  await newCaseDialog.fillFormWithData(dataTable.hashes())
  this.dataTable = this.dataTable !== undefined ? this.dataTable.concat(dataTable.hashes()) : dataTable.hashes();
})

When("User opens delegation with {string} status", async function (this: MyWorld, statusName: string) {
  await casesView.openDelegationWithStatus(statusName);
})

When("User clicks on {string} button in delegation view", async function (this: MyWorld, buttonName: string) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.waitForCaseDetailsView();
  await caseDetails.clickOnButton(buttonName, true);
})

When("User provides comment in dialog window", async function (this: MyWorld) {
  approveDelegationDialog = new ApproveDelegationDialog(this.page);
  await approveDelegationDialog.fillCommentTextBox();
})

When("User clicks on {string} button in dialog window", async function (this: MyWorld, buttonName: string) {
  await approveDelegationDialog.clickOnButton(buttonName);
})

Then("Delegation window opens", async function (this: MyWorld) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.assertCaseDetailsViewIsLoaded();
})

Then("Delegation details are as expected", async function (this: MyWorld) {
  await caseDetails.assertCaseDetailsAreAsExpected(this.dataTable);
  console.table(this.dataTable);
})

Then("Delegation is in {string} Status", async function (this: MyWorld, statusName: string) {
  await caseDetails.assertStatusIsAsExpected(statusName);
})

Then("Buttons {string} are not displayed", async function (this: MyWorld, buttons: string) {
  for(const button of buttons.split("; ")) {
    await caseDetails.assertButtonIsNotDisplayed(button);
  }
})
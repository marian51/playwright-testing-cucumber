import { Given, Then, When } from "@cucumber/cucumber";
import { MyWorld } from "../../support/config";
import { CasesView } from "../page-objects/cases-view/CasesView.ts";
import { NewCaseDialog } from "../page-objects/cases-view/NewCaseDialog.ts";
import { CaseDetails } from "../page-objects/cases-view/CaseDetails.ts";
import { ApproveDelegationDialog } from "../page-objects/cases-view/ApproveDialog.ts";
import { NewCostDialog } from "../page-objects/cases-view/NewCostDialog.ts";
import { ConfirmSettlementDialog } from "../page-objects/cases-view/ConfirmSettlementDialog.ts";

let casesView: CasesView,
  newCaseDialog: NewCaseDialog,
  caseDetails: CaseDetails,
  approveDelegationDialog: ApproveDelegationDialog,
  newCostDialog: NewCostDialog,
  confirmSettlementDialog: ConfirmSettlementDialog;

Given("There is at least one existing delegation with {string} status", async function (this: MyWorld, statusName: string) {
  casesView = new CasesView(this.page);
  await casesView.checkThatThereIsCaseWithStatus(statusName);
});

Given("There is {string} selected view", async function (this: MyWorld, selectedView: string) {
  casesView = new CasesView(this.page);
  await casesView.selectView(selectedView);
});

Given("View is filtered by {string}", async function (this: MyWorld, filterText: string) {
  casesView = new CasesView(this.page);
  await casesView.filterView(filterText);
});

When("User clicks on {string} button in Cases view", async function (this: MyWorld, buttonName: string) {
  casesView = new CasesView(this.page);
  await casesView.clickOnButton(buttonName);
});

When("User selects {string} delegation type", async function (this: MyWorld, caseType: string) {
  newCaseDialog = new NewCaseDialog(this.page);
  await newCaseDialog.selectCaseType(caseType);
});

When("User clicks on {string} button in New Case dialog", async function (this: MyWorld, buttonName: string) {
  await newCaseDialog.clickOnButton(buttonName, true);
});

When("User provides delegation information in {string} section as below", async function (this: MyWorld, sectionName: string, dataTable: any) {
  await newCaseDialog.scrollToHeading(sectionName);
  await newCaseDialog.fillFormWithData(dataTable.hashes());
  this.dataTable = this.dataTable !== undefined ? this.dataTable.concat(dataTable.hashes()) : dataTable.hashes();
});

When("User opens delegation with {string} status", async function (this: MyWorld, statusName: string) {
  await casesView.openDelegationWithStatus(statusName);
});

When("User clicks on {string} button in delegation view", async function (this: MyWorld, buttonName: string) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.waitForCaseDetailsView();
  await caseDetails.clickOnButton(buttonName, true);
});

When("User provides comment in dialog window", async function (this: MyWorld) {
  approveDelegationDialog = new ApproveDelegationDialog(this.page);
  await approveDelegationDialog.fillCommentTextBox();
});

When("User clicks on {string} button in dialog window", async function (this: MyWorld, buttonName: string) {
  await approveDelegationDialog.clickOnButton(buttonName);
});

When("User opens {int} delegation", async function (this: MyWorld, delegationNumber: number) {
  casesView = new CasesView(this.page);
  await casesView.openDelegationByNumber(delegationNumber);
});

When("User clicks on {string} status in statuses bar", async function (this: MyWorld, statusName: string) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.waitForCaseDetailsView();
  await caseDetails.selectStatusByName(statusName);
});

When("User saves value from {string} field", async function (this: MyWorld, fieldName: string) {
  this.savedValue = await caseDetails.saveValueFromField(fieldName);
});

When("User clicks on {string} tab in delegation view", async function (this: MyWorld, tabName: string) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.clickOnTab(tabName);
});

When("User adds new entry in {string} section", async function (this: MyWorld, sectionName: string) {
  await caseDetails.addNewEntryInSection(sectionName);
});

When("User selects {string} record type", async function (this: MyWorld, recordName: string) {
  newCostDialog = new NewCostDialog(this.page);
  await newCostDialog.selectCaseType(recordName);
});

When("User clicks {string} button in New Cost dialog", async function (this: MyWorld, buttonName: string) {
  await newCostDialog.clickOnButton(buttonName, true);
});

When("User provides cost information in {string} section as below", async function (this: MyWorld, sectionName: string, dataTable: any) {
  await newCostDialog.scrollToHeading(sectionName);
  await newCostDialog.fillFormWithData(dataTable.hashes(), this);
  this.dataTable = this.dataTable !== undefined ? this.dataTable.concat(dataTable.hashes()) : dataTable.hashes();
});

When("User clicks on {string} button in New Cost dialog", async function (this: MyWorld, buttonName: string) {
  await newCostDialog.clickOnButton(buttonName, true);
});

When("New cost is added to delegation", async function (this: MyWorld) {
  await caseDetails.checkThatCostIsAdded(
    this.dataTable.filter((e: { Field: string; Value: string }) => e.Field === "Business Trip Cost Name")[0].Value
  );
});

When("User clicks on {string} button in confirmation Settlement dialog", async function (this: MyWorld, buttonName: string) {
  confirmSettlementDialog = new ConfirmSettlementDialog(this.page);
  await confirmSettlementDialog.clickOnButton(buttonName);
});

When("Delegation view is not processing", async function (this: MyWorld) {
  await caseDetails.waitForStopProcessing();
})

Then("Delegation window opens", async function (this: MyWorld) {
  caseDetails = new CaseDetails(this.page);
  await caseDetails.assertCaseDetailsViewIsLoaded();
});

Then("Delegation details are as expected", async function (this: MyWorld) {
  await caseDetails.assertCaseDetailsAreAsExpected(this.dataTable);
  console.table(this.dataTable);
});

Then("Delegation is in {string} Status", async function (this: MyWorld, statusName: string) {
  await caseDetails.assertStatusIsAsExpected(statusName);
});

Then("Buttons {string} are not displayed", async function (this: MyWorld, buttons: string) {
  for (const button of buttons.split("; ")) {
    await caseDetails.assertButtonIsNotDisplayed(button);
  }
});

Then("The relevant fields have corresponding values", async function (this: MyWorld, dataTable: any) {
  await caseDetails.assertCaseSettlementFieldsAreAsExpected(dataTable.hashes());
})

Then("Status in statuses bar is set to {string}", async function (this: MyWorld, statusName: string) {
  await caseDetails.assertStatusInStatusesBar(statusName);
})

Then("Costs are distributed according to the project setting", async function (this: MyWorld) {
  // hardcoded
  await caseDetails.assertDistributedCosts();
})
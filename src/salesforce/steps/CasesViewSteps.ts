import { Given, Then, When } from "@cucumber/cucumber";
import { MyWorld } from "../../support/config";
import { CasesView } from "../page-objects/cases-view/CasesView.ts";
import { NewCaseDialog } from "../page-objects/cases-view/NewCaseDialog.ts";
import { CaseDetails } from "../page-objects/cases-view/CaseDetails.ts";
import { ApproveDelegationDialog } from "../page-objects/cases-view/ApproveDialog.ts";

let casesView: CasesView, newCaseDialog: NewCaseDialog, caseDetails: CaseDetails, approveDelegationDialog: ApproveDelegationDialog;


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


@sf @delegation
Feature: Scenarios for tests of delegations

  @create_delegation
  Scenario: Checking that creating new delegation works correct
    Given Salesforce application is opened
    And User is logged to the Salesforce application
    When Main view of Salesforce application is loaded
    And User clicks on "Cases" tab
    And User clicks on "New" button in Cases view
    And User selects "Business Trip: Project" delegation type
    And User clicks on "Next" button in New Case dialog
    And User provides delegation information in "Basic Information" section as below
      | Field      | Value           |
      | Subject    | Delegation      |
      | Project    | Sandbox_Project |
      | Status     | New             |
      | Start Date | 30.08.2024      |
      | End Date   | 31.08.2024      |
      | Traveler   | Sandbox_User    |
    And User provides delegation information in "Additional Information" section as below
      | Field                           | Value                 |
      | Accommodation                   | Sandbox_Accommodation |
      | Place Of Departure              | Kraków                |
      | Place Of Arrival                | Wrocław               |
      | Travel Purpose                  | Training              |
      | Travel Type                     | Poland                |
      | Transport Type                  | Own Transport         |
      | Acceptance Of Mileage Allowance | Yes                   |
      | Breakfast                       | No                    |
    And User provides delegation information in "Mileage Allowance Information" section as below
      | Field                 | Value   |
      | Registration Number   | XYZ 123 |
      | Engine Capacity [cm3] | 1000,00 |
      | Distance [km]         | 250,00  |
    And User clicks on "Save" button in New Case dialog
    Then Delegation window opens
    And Delegation details are as expected

  @approve_delegation
  Scenario: Checking that approving existing delegation works correct
    Given Salesforce application is opened
    And User is logged to the Salesforce application
    And User is on "Cases" tab
    And There is at least one existing delegation with "Needs Manager Approval" status
    When User opens delegation with "Needs Manager Approval" status
    And User clicks on "Approve" button in delegation view
    And User provides comment in dialog window
    And User clicks on "Approve" button in dialog window
    Then Delegation is in "In Progress" Status
    And Buttons "Approve; Reject" are not displayed

  @settle_delegation
  Scenario: Checking that settling approved delegation works correct
    Given Salesforce application is opened
    And User is logged to the Salesforce application as "administrative" user
    And User is on "Cases" tab
    And There is "All Open Cases" selected view
    And View is filtered by "In progress"
    When User opens 1 delegation
    And User clicks on "Waiting For Invoice" status in statuses bar
    And User clicks on "Mark as Current Status" button in delegation view
    And User saves value from "Mileage Allowance Amount" field
    And User clicks on "Settlement" tab in delegation view
    And User adds new entry in "Business Trip Costs" section
    And User selects "Other" record type
    And User clicks "Next" button in New Cost dialog
    And User provides cost information in "Information" section as below
      | Field                   | Value             |
      | Business Trip Cost Name | Transport cost    |
      | Type                    | Mileage Allowance |
      | Paid By                 | Sandbox_Company   |
      | Amount                  | copied_value      |
    And User clicks on "Save" button in New Cost dialog
    And New cost is added to delegation
    And User clicks on "Calculate Settlement" button in delegation view
    And User clicks on "Yes" button in confirmation Settlement dialog
    And User clicks on "Settle Employee" button in delegation view
    And User clicks on "Settle Employee" button in confirmation Settlement dialog
    And User clicks on "Settle Project" button in delegation view
    And User clicks on "Settle Project" button in confirmation Settlement dialog
    And Delegation view is not processing
    Then The relevant fields have corresponding values
      | Field                            | Value                   |
      | Employee Settled                 | checked                 |
      | Project Settled                  | checked                 |
      | Status Of Calcs For The Employee | Calculated With Success |
      | Status Of Calcs On The Project   | Calculated With Success |
    And Status in statuses bar is set to "Closed"
    And Costs are distributed according to the project setting

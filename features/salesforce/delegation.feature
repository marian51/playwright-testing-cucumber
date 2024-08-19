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


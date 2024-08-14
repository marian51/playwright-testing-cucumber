@sf
Feature: Basic scenarios for testing main view of application

  Scenario: Checking if all tabs are displayed
    Given Salesforce application is opened
    And User is logged to the Salesforce application
    When Main view of Salesforce application is loaded
    Then The following tabs are displayed
      | Tab             |
      | Home            |
      | Timesheet       |
      | Annual Surveys  |
      | Send Surveys    |
      | Projects        |
      | Company Costs   |
      | Payments        |
      | Billing Periods |
      | Accounts        |

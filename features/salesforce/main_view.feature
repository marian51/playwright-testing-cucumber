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

  Scenario: Checking if tabs are displayed in "More" tab
    Given Salesforce application is opened
    And User is logged to the Salesforce application
    When Main view of Salesforce application is loaded
    And User clicks on "More" tab
    Then The following tabs are displayed in tabs dropdown
      | Tab                       |
      | Billing Period Strategies |
      | Worklogs                  |
      | Agreements                |
      | Work Absences             |
      | Benefits                  |
      | User Management           |
      | Reports                   |
      | Resource Planning         |
      | Contacts                  |
      | People                    |
      | Groups                    |
      | Project Worklogs          |
      | Logging Periods           |
      | Cases                     |
      | Subactivities             |
      | Monthly Financial Results |
      | Project Groups            |
      | Tasks                     |
      | Targets                   |
      | Invoices                  |
      | Project Planning 2.0      |
      | Request Logs              |
      | Surveys                   |
      | Performance Reviews       |

@gui @space
Feature: UI tests for checking basic space functionalities

  Background: User is logged to the application
    Given Login page is open
    When User logs with correct credentials
    Then User is logged to the application

  @create
  Scenario Outline: User creates new space
    Given A "Create Space" modal window is open
    When User types "<new space name>" in new space input
    And User clicks "Continue" button in new space modal window
    And User clicks "Create Space" button in new space modal window
    Then New space with "<new space name>" name is displayed on left side menu

    Examples:
      | new space name |
      | GUI new space  |

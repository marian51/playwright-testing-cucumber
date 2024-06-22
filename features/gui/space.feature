@gui @space
Feature: UI tests for checking basic space functionalities

  Background: User is logged to the application
    Given Login page is open
    When User logs with correct credentials
    Then User is logged to the application

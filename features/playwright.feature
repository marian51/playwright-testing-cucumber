Feature: Basic Cucumber test

  Background: Navigation
    Given Go to the main website

  Scenario: Change website theme
    When Change theme to 'dark' mode
    Then We see 'dark' mode
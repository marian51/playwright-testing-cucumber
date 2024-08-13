@gui @doc @all
Feature: UI tests for checking basic doc functionalities

  Background: User is logged to application
    Given Application is opened
    When User is logged to the application
    And Basic space for tests is created
    Then Application is ready to test

  @create
  Scenario Outline: User creates new doc
    Given A new doc is created in basic space
    When User saves new doc with "<new doc name>" name
    Then New doc with "<new doc name>" name is displayed on left side menu

    Examples:
      | new doc name |
      | Example doc  |

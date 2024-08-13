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

  @delete @steps
  Scenario Outline: User deletes existing doc
    Given A doc with "<example_doc>" name exists in basic space
    When User clicks on "<example_doc>" element on left menu by "right" mouse button
    And User choose "Delete" option in doc context menu
    Then Doc with "<example_doc>" is not displayed on left side menu
    And Doc with "<example_doc>" is not listed in docs list

    Examples:
      | example_doc |
      | Example doc |

@gui @space @all
Feature: UI tests for checking basic space functionalities

  Background: User is logged to the application
    Given Application is opened
    # Given Login page is open
    # When User logs with correct credentials
    Then User is logged to the application
    And Application is ready to test

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

  @delete
  Scenario Outline: User deletes existing space
    Given A space with name "<new space name>" is open
    When User clicks by "right" click on "<new space name>" in left side menu
    And User choose "Delete" option from space context menu
    And User types "<new space name>" in space name input in 'Delete space' modal window
    And User clicks "Delete" button on 'Delete space' modal window
    Then Element with "<new space name>" name is not displayed on lef side menu

    Examples:
      | new space name |
      | GUI new space  |

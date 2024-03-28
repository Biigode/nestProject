Feature: User creation
  As a user
  I want to be able to create a new user
  So that I can access the system

  Scenario: Creating a new user
    Given I have the following user data:
      | name   | email                 |
      | victor | victor.teste@teste.com |
    When I create a user with the following data
    Then I should receive a response with the following data:
      | name   | email                  | tasks |
      | victor | victor.teste@teste.com | []    |

  Scenario: Creating a new user without name
    Given I have the following user data:
      | email                 |
      | victor.teste@teste.com |
    When I create a user with the following data
    Then I should receive a response with status code 400


  Scenario: Creating a new user without email
    Given I have the following user data:
      | name   |
      | victor |
    When I create a user with the following data
    Then I should receive a response with status code 400
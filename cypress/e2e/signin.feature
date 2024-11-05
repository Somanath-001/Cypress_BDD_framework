@sign-in
Feature: Signin to the account

    Signin with valid credentials

    Background: Pre-conditions
        Given Navigated to the avactis homescreen
        When I click on signin tab
        Then I should navigated to the my account screen

    Scenario: Validated to the signin functionality with valid credentials

        And I type the valid email id
        And I type the valid password
        When I click on signin button
        Then I should be directed to the My Account screen

    Scenario: Validated to the signin functionality with invalid email

        And I type the invalid email id
        And I type the valid password
        When I click on signin button
        Then I should see the account and password could not findout  error

    Scenario: Validated to the signin functionality with invalid password

        And I type the valid email id
        And I type the invalid password
        When I click on signin button
        Then I should see the account and password could not findout  error

    @smoke
    Scenario Outline: Validate successful and unsuccessful sign-in

        And I type the email "<email>" and password "<password>"
        When I click on signin button
        Then I should see the "<message>"

        Examples:
            | email               | password   | message                                                                       |
            | test_0018@gmail.com | foobarbazz | My Account                                                                    |
            | 1245635@gmail.com   | foobarbazz | Account and password could not be identified. Try again or create an account. |
            | test_0018@gmail.com | 123456     | Account and password could not be identified. Try again or create an account. |
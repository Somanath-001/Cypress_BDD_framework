@account-creation
Feature: Create account
    Background: Pre conditions
        Given Navigates to the avactis homescreen
        When I click on the signin tab
        Then I should navigated to the my account screen
        When I tap on the Register button
        Then I should redirected to the registration form screen


    Scenario: Create the account

        And I types the valid email id
        And I types the valid password
        And I type the valid password in re-type password field
        And I type the first name
        And I type the last name
        And I select the country
        And I select the state
        And I type the zipcode
        And I type the city
        And I type the Address
        And I type the phone number
        When I tap on register button
        Then I should redirected to the my account screen and should see the account creation successfull message



    Scenario: Create the account with existing email
        And I types the existing email id
        And I types the valid password
        And I type the valid password in re-type password field
        And I type the first name
        And I type the last name
        And I select the country
        And I select the state
        And I type the zipcode
        And I type the city
        And I type the Address
        And I type the phone number
        When I tap on register button
        Then I should see the This account name is already taken error message


    Scenario: Create the account without filling required fields

        And I types the valid email id
        And I types the valid password
        And I type the valid password in re-type password field
        And I put the empty for the first name
        And I put the empty for the last name
        When I tap on register button
        Then I should see the error message



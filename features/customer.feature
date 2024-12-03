Feature: Customers API
  As an API consumer
  I want to retrieve customers by CPF
  So that I can validate their existence

  Scenario: Retrieve a customer by CPF
    Given a customer exists with CPF "12345678901"
    When I retrieve the customer by CPF "12345678901"
    Then I should receive the customer's details

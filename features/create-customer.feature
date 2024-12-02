Feature: Create Customer

Scenario: Successfully creating a new customer
  Given I have a valid customer data
  When I send a request to create a customer
  Then the customer should be created successfully
  And the response status code should be 201

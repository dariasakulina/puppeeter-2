Feature: Ticket Booking

  Scenario: Successful ticket booking
    Given User is on the main page
    When User select day 2 and choose row 3 seat 4
    And User confirm booking
    Then User should see the booking confirmation

  Scenario: Booking without selecting a seat
    Given User is on the main page
    When User select day 3 and a seance
    And User confirm booking
    Then User should remain on the same page
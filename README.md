# cypress-pollyjs
**Work in progress**

A currently non-working example of using Cypress and PollyJs together.

[Issue posted with Netflix / PollyJS](https://github.com/Netflix/pollyjs/issues/388) 

## Motivation
When testing with Cypress, using the native fixtures for API payloads, against existing web APIs, there is a potentially a large development effort to extract and maintain the fixtures. 

- recording test stubs (fixtures) and keeping them organised and up to date is time consuming
- making sure that the test stubs are 'in sync' with their underlying APIs is an ongoing effort

## Goal
Improve developer development / test workflows by making the creation and maintenance of api test fixtures more automated.

## Approach
Add a low / zero config plugin to Cypress or an adapter to PollyJS to take advantage of PollyJs within tests from natural commands.

+ easily record test stubs for Cypress tests
+ help keep test stubs up to date with underlying APIs
+ get some certainty over contracts at to Web APIs


## References
* [cypress.io/](https://cypress.io) 
* [netflix.github.io/pollyjs](https://netflix.github.io/pollyjs/)

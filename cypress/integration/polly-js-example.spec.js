/// <reference types="cypress"/>

import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import RestPersister from "@pollyjs/persister-rest";

const POLLY_INSTANCE = "pollyInstance";

describe("Polly JS", () => {
  beforeEach(() => {
    cy.on("window:before:load", (win) => {
      Polly.register(FetchAdapter);
      Polly.register(RestPersister);
   
      const polly = new Polly("pollyjs-cypress", {
        adapters: ["fetch"],
        adapterOptions: {
          fetch: {
            context: win,
          },
        },
        persister: "rest",
        persisterOptions: {
            rest: {
                host: 'http://localhost:3000',
              },            
        },
        logging: true,
        recordIfMissing: true,
        recordFailedRequests: true,
      });

      Cypress.config(POLLY_INSTANCE, polly);

      const { server } = polly;

      server.any('https://jsonplaceholder.typicode.com/*').recordingName('jsonplaceholder');
    });
  });

  it("should work", () => {
    cy.visit("/index.html");
  });

  afterEach(() => {
    cy.wrap(null, { log: true }).then(() => {
      const pollyInstance = Cypress.config(POLLY_INSTANCE);
      pollyInstance.disconnectFrom("fetch");
      return pollyInstance.stop();
    });
  });
});

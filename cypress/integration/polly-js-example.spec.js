/// <reference types="cypress"/>

import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import RestPersister from "@pollyjs/persister-rest";
import LocalStoragePersister from "@pollyjs/persister-local-storage";

const POLLY_INSTANCE = "pollyInstance";

describe("Polly JS", () => {
  beforeEach(() => {
    cy.on("window:before:load", (win) => {
      Polly.register(FetchAdapter);
      Polly.register(RestPersister);
      // Polly.register(LocalStoragePersister);

      const polly = new Polly("pollyjs-cypress", {
        // mode: "replay",
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
        // persister: "local-storage",
        logging: true,
        recordIfMissing: true,
        recordFailedRequests: true,
      });

      Cypress.config(POLLY_INSTANCE, polly);
      win.polly = polly;

      const { server } = polly;

      server.any('https://jsonplaceholder.typicode.com/*').recordingName('jsonplaceholder');
    //   server.host("https://jsonplaceholder.typicode.com", () => {
    // //     server.get("*path").intercept((req, res) => {
    // //         console.log(req.params.path)
    // //         // res.status(200).send({})
    // //         res.json({'foo': 'bar'})            
    // //     });

    //     server.get("*").passthrough();
    //   });

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

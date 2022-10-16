// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchResult: "done.invoke.searchMachine.fetching-result:invocation[0]";
  };
  missingImplementations: {
    actions: "abortFetch";
    services: "fetchResult";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    abortFetch: "ABORT";
  };
  eventsCausingServices: {
    fetchResult: "NEXT";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "fetching-result" | "result-fetched" | "waiting-for-input";
  tags: never;
}

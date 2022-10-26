// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.searchMachine.accepting_search_input.fetching:invocation[0]": {
      type: "done.invoke.searchMachine.accepting_search_input.fetching:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.searchMachine.accepting_search_input.fetching:invocation[0]": {
      type: "error.platform.searchMachine.accepting_search_input.fetching:invocation[0]";
      data: unknown;
    };
    "xstate.after(300)#searchMachine.accepting_search_input.to_be_validated": {
      type: "xstate.after(300)#searchMachine.accepting_search_input.to_be_validated";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignErrorToContext: "error.platform.searchMachine.accepting_search_input.fetching:invocation[0]";
    assignInputToContext: "INPUT_CHANGE";
    assignResultToContext: "done.invoke.searchMachine.accepting_search_input.fetching:invocation[0]";
    assignValidationResultToContext: "xstate.after(300)#searchMachine.accepting_search_input.to_be_validated";
    resetInput: "INPUT_CHANGE" | "NEW_SEARCH" | "RETRY" | "xstate.init";
    resetMap: "INPUT_CHANGE" | "NEW_SEARCH" | "RETRY" | "xstate.init";
    resetResult: "error.platform.searchMachine.accepting_search_input.fetching:invocation[0]";
    setMap: "done.invoke.searchMachine.accepting_search_input.fetching:invocation[0]";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    hasInput: "INPUT_CHANGE";
    inputValid: "xstate.after(300)#searchMachine.accepting_search_input.to_be_validated";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "accepting_search_input"
    | "accepting_search_input.empty"
    | "accepting_search_input.fetching"
    | "accepting_search_input.invalid"
    | "accepting_search_input.to_be_validated"
    | "accepting_search_input.valid"
    | "displaying_error"
    | "displaying_result"
    | {
        accepting_search_input?:
          | "empty"
          | "fetching"
          | "invalid"
          | "to_be_validated"
          | "valid";
      };
  tags: never;
}

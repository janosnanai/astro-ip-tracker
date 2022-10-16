import { assign, createMachine } from "xstate";

export const searchMachine = createMachine({
  id: "searchMachine",
  context: {
    searchResult: null as IpGeoResponseData | null,
    searchInput: "",
  },
  tsTypes: {} as import("./searchMachine.typegen").Typegen0,
  initial: "waiting-for-input",
  states: {
    "waiting-for-input": {
      on: {
        NEXT: "fetching-result",
      },
    },
    "fetching-result": {
      invoke: {
        src: "fetchResult",
        onDone: "result-fetched",
        onError: "waiting-for-input",
      },
      on: {
        ABORT: { actions: "abortFetch", target: "waiting-for-input" },
      },
    },
    "result-fetched": { on: { NEXT: "waiting-for-input" } },
  },
  // {
  //   actions:{
  //     assignResultToContext: assign((context, event)=>{
  //       return{
  //         result: event.data,
  //       }
  //     })
  //   }
  // }
});

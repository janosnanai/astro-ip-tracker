import type { AddressValidationResult } from "../validateAddress";

import { assign, createMachine } from "xstate";

import fetchLocation from "../fetchLocation";
import validateAddress from "../validateAddress";
import { setIpGeoAtom, resetIpGeoAtom } from "../atoms/ipGeoAtom";

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SzAQwE4GMAWBZVOAlgHZgB0BmYADgC4lQD6KGOjJ1ArrWWALZ0AngGIAkgDkACgFUAKowDCACQCC4gOIBRANoAGALqJQ1APaxC9E8SMgAHogDMANgAsZBwHZdLgBwOHAJw+Lp4ArAA0IIKOAIwATGQeLgEBTnFxPpm66S4AvrmRLFh4BNgk5JQ09MRMRWwc3LwCtCISMvLKalraMYZIIKbmltb99ggZDmTx3n6BwWFOkdHjcZPJKWkZWTn5hWjF+ESkFJhUdAzM+-XEXDy0JowARmCMAG6oADaEEKi0kGJSOSKVQaHQGGyDCyEKw2MYxAIeMgBXQeDIeUIIpyhNIRKKIFxOREeGLeVGhFxxLw+UK7EB1EpHCqnKoXensG6Ne5PF7vL4-P4QAHtYFdHS9CFmKEw0b4wKJHzpHzozHYhxLRChPzuZVOALOTI+XQOWn0w5lY6Vc41S6sbDs25kLnPN6fb6-f5tIGdUHaOJ9YyS4aw2UJby6eIeHwxHxpBEudUIJxpMjeAKhBzpJzw7ExfIFEDEEwQOA2U2lconM7VWpXO0NHj8IQSobQkagMa6BMuaNIlKpRXbOJ5fNlxmVlnWtn1x0PZ28t0C5tStt2RCdvEITWTMKpPVOA1Gk21s0Vy3Vm3Fe2NecQJdBmUIdfLYm6MguUIYj8Bbsxd8BI+2ieFrMlaNa2lePAkDed6tsGj4Jn4iLphiMTwmmszDnsgHlsBVasrWEEwdK7aIAAtL4CYxA4bjrGm6TUasMQeMaI7Hjh5AQIQsDUB8qCCBc6BwJwHy0ERK5jORPiUeGCRZhicTItShKogBBzsWQnHcbx-HWmA6DoCY6BiXBkmUVRARkLqGIEkxH5xLmrHYYyxkPqRqRdqEb59q46L7vZLjDvkQA */
  createMachine(
    {
      predictableActionArguments: true,
      context: {
        searchInput: "",
        searchResult: null as IpGeoResponseData | null,
        validationResult: null as AddressValidationResult | null,
        error: null as Error | null,
      },
      tsTypes: {} as import("./searchMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | { type: "INPUT_CHANGE"; value: string }
          | { type: "EXEC_SEARCH" }
          | { type: "RETRY" }
          | { type: "CANCEL" }
          | { type: "NEW_SEARCH" },
      },
      id: "searchMachine",
      initial: "accepting_search_input",
      states: {
        accepting_search_input: {
          initial: "empty",
          states: {
            empty: {
              entry: ["resetInput", "resetMap"],
              on: {
                INPUT_CHANGE: [
                  {
                    actions: "assignInputToContext",
                    target: "to_be_validated",
                    cond: "hasInput",
                  },
                  {
                    actions: "assignInputToContext",
                    target: "empty",
                  },
                ],
              },
            },
            to_be_validated: {
              after: {
                300: [
                  { cond: "inputValid", target: "valid" },
                  { target: "invalid" },
                ],
              },
              on: {
                INPUT_CHANGE: [
                  {
                    actions: "assignInputToContext",
                    target: "to_be_validated",
                    cond: "hasInput",
                    internal: false,
                  },
                  {
                    actions: "assignInputToContext",
                    target: "empty",
                  },
                ],
              },
            },
            valid: {
              entry: "assignValidationResultToContext",
              on: {
                EXEC_SEARCH: {
                  target: "fetching",
                },
                INPUT_CHANGE: [
                  {
                    actions: "assignInputToContext",
                    target: "to_be_validated",
                    cond: "hasInput",
                  },
                  {
                    actions: "assignInputToContext",
                    target: "empty",
                  },
                ],
              },
            },
            invalid: {
              on: {
                INPUT_CHANGE: [
                  {
                    actions: "assignInputToContext",
                    target: "to_be_validated",
                    cond: "hasInput",
                  },
                  {
                    actions: "assignInputToContext",
                    target: "empty",
                  },
                ],
              },
            },
            fetching: {
              invoke: {
                src: (context, _event) => fetchLocation(context.searchInput),
                onDone: {
                  actions: ["assignResultToContext", "setMap"],
                  target: "#searchMachine.displaying_result",
                },
                onError: {
                  actions: ["resetResult", "assignErrorToContext"],
                  target: "#searchMachine.displaying_error",
                },
              },
              on: { CANCEL: { target: "to_be_validated" } },
            },
          },
        },
        displaying_result: {
          on: { NEW_SEARCH: { target: "accepting_search_input" } },
        },
        displaying_error: {
          on: {
            NEW_SEARCH: { target: "accepting_search_input" },
            RETRY: { target: "accepting_search_input.fetching" },
          },
        },
      },
    },
    {
      guards: {
        hasInput: (_context, event) => {
          return !!event.value;
        },
        inputValid: (context, _event) => {
          const validationResult = validateAddress(context.searchInput);
          // // little sketchy but this way its only validated once
          // assign(() => {
          //   return {
          //     validationResult,
          //   };
          // });
          return validationResult.isValid;
        },
      },
      actions: {
        assignInputToContext: assign((_context, event) => {
          return {
            searchInput: event.value,
          };
        }),
        assignResultToContext: assign((_context, event) => {
          return { searchResult: event.data as IpGeoResponseData };
        }),
        assignValidationResultToContext: assign((context, _event) => {
          const validationResult = validateAddress(context.searchInput);
          return { validationResult };
        }),
        assignErrorToContext: assign((_context, event) => {
          return { error: event.data as Error };
        }),
        resetResult: assign((_context, _event) => {
          return { searchResult: null };
        }),
        resetInput: assign((_context, _event) => {
          return { searchInput: "" };
        }),
        setMap: (_context, event) => {
          setIpGeoAtom(event.data as IpGeoResponseData);
        },
        resetMap: () => {
          resetIpGeoAtom();
        },
      },
    }
  );

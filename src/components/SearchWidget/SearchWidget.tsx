import { useMachine } from "@xstate/react";

import SearchBar from "./SearchBar";
import SearchLoading from "./SearchLoading";
import SearchError from "./SearchError";
import SearchResult from "./SearchResult";
import { searchMachine } from "../../utils/machines/searchMachine";

function SearchWidget() {
  const [state, send] = useMachine(searchMachine);

  function onChange(value: string) {
    send({ type: "INPUT_CHANGE", value });
  }

  function onSubmit() {
    send({ type: "EXEC_SEARCH" });
  }

  function onCancel() {
    send({ type: "CANCEL" });
  }

  function onNewSearch() {
    send({ type: "NEW_SEARCH" });
  }

  function onRetry() {
    send({ type: "RETRY" });
  }

  return (
    <div className="bg-violet-50 dark:bg-zinc-900 bg-gradient-to-br from-transparent to-indigo-800/30 border border-violet-500 overflow-hidden rounded-xl shadow-lg">
      {state.matches("accepting_search_input") &&
        !state.matches("accepting_search_input.fetching") && (
          <SearchBar
            searchInput={state.context.searchInput}
            validatedType={state.context.validationResult?.type}
            valid={state.matches("accepting_search_input.valid")}
            invalid={state.matches("accepting_search_input.invalid")}
            unvalidated={state.matches(
              "accepting_search_input.to_be_validated"
            )}
            {...{ onChange, onSubmit }}
          />
        )}
      {state.matches("accepting_search_input.fetching") && (
        <SearchLoading onCancel={onCancel} />
      )}
      {state.matches("displaying_result") && (
        <SearchResult
          ipGeoData={state.context.searchResult}
          onNewSearch={onNewSearch}
        />
      )}
      {state.matches("displaying_error") && (
        <SearchError
          error={state.context.error}
          {...{ onRetry, onNewSearch }}
        />
      )}
    </div>
  );
}

export default SearchWidget;

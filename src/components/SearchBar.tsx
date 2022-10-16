import type { ChangeEvent, FormEvent } from "react";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import validateAddress from "../utils/validateAddress";
import { ipGeoAtom } from "../utils/atoms/ipGeoAtom";
import { snackbarNotification } from "../utils/atoms";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [validatorState, setValidatorState] = useState(false);

  let validatorTimer: NodeJS.Timeout;

  useEffect(() => {
    clearTimeout(validatorTimer);
    validatorTimer = setTimeout(() => {
      if (searchInput) {
        const validationResult = validateAddress(searchInput);
        setValidatorState(validationResult.isValid);
        snackbarNotification({
          type: validationResult.isValid
            ? "type-check-pass"
            : "type-check-fail",
          message: validationResult.type || "invalid address format",
        });
      }
    }, 300);
    return () => clearTimeout(validatorTimer);
  }, [searchInput]);

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch(`/api/${searchInput}`);

      if (!response.ok) {
        throw new Error(response.statusText || "Unknown error");
      }

      const data: IpGeoResponseData = await response.json();
      ipGeoAtom.set(data);
      setSearchInput("");
    } catch (err: any) {
      snackbarNotification({
        type: "error",
        message: err.message,
      });
    }
  }

  return (
    <form action="submit" onSubmit={submitHandler}>
      <div className="flex">
        <input
          onChange={inputChangeHandler}
          value={searchInput}
          type="text"
          placeholder="enter an ip or url to track..."
          className="grow px-2 py-1 bg-zinc-800 text-emerald-500 placeholder:text-zinc-500"
        />
        <button
          type="submit"
          disabled={!validatorState}
          className={`p-1 border-l border-l-zinc-700 bg-zinc-800 ${
            validatorState ? "text-purple-400" : "text-zinc-500"
          }`}
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

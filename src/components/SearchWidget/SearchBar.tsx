import type { ChangeEvent, FormEvent } from "react";

import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

function SearchBar({
  searchInput,
  validatedType,
  valid,
  invalid,
  unvalidated,
  onChange,
  onSubmit,
}: {
  searchInput: string;
  validatedType?: string;
  valid: boolean;
  invalid: boolean;
  unvalidated: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form action="submit" onSubmit={submitHandler} className="p-3">
      <div className="flex">
        <input
          onChange={inputChangeHandler}
          value={searchInput}
          type="text"
          placeholder="enter an ip or url to track..."
          className="grow text-sm sm:text-base px-1 sm:px-2 rounded-lg bg-violet-50 dark:bg-zinc-900 border border-violet-500 text-zinc-900 dark:text-zinc-300 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
        />
        <button
          type="submit"
          disabled={!valid}
          className="ml-2 p-2 rounded-full border border-violet-500 disabled:border-zinc-500 bg-emerald-500 hover:bg-emerald-400 disabled:bg-transparent text-emerald-900 disabled:text-zinc-500 transition outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
        >
          <MagnifyingGlassIcon className="w-4 sm:w-6 h-4 sm:h-6" />
        </button>
      </div>
      <div className="mt-2">
        {!searchInput && (
          <div className="flex items-center gap-2 text-zinc-500">
            <InformationCircleIcon className="w-6 h-6" />
            <p className="text-sm sm:text-base">no input</p>
          </div>
        )}
        {unvalidated && (
          <div className="flex items-center gap-2 text-zinc-500">
            <InformationCircleIcon className="w-6 h-6" />
            <p className="text-sm sm:text-base">unvalidated</p>
          </div>
        )}
        {invalid && (
          <div className="flex items-center gap-2 text-red-500">
            <XCircleIcon className="w-6 h-6" />
            <p className="text-sm sm:text-base">invalid format</p>
          </div>
        )}
        {valid && (
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircleIcon className="w-6 h-6" />
            <p className="text-sm sm:text-base">
              valid format: {validatedType}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBar;

import type { ChangeEvent, FormEvent } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar({
  searchInput,
  valid,
  invalid,
  unValidated,
  onChange,
  onSubmit,
}: {
  searchInput: string;
  valid: boolean;
  invalid: boolean;
  unValidated: boolean;
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
    <form action="submit" onSubmit={submitHandler}>
      <div className="flex">
        <input
          onChange={inputChangeHandler}
          value={searchInput}
          type="text"
          placeholder="enter an ip or url to track..."
          className="grow px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 placeholder:text-zinc-500"
        />
        <button
          type="submit"
          disabled={!valid}
          className="ml-2 p-2 rounded-full bg-emerald-500 disabled:bg-zinc-700 text-zi-900 disabled:text-zinc-500 transition"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

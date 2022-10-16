import { useStore } from "@nanostores/react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { snackbarAtom, snackbarReset } from "../utils/atoms";

function Snackbar() {
  const notification = useStore(snackbarAtom);

  function closeHandler() {
    snackbarReset();
  }

  return (
    <Transition
      show={!!notification}
      enter="transition duration-300 ease-out"
      enterFrom="opacity-0 -translate-x-10"
      enterTo="opacity-100 translate-x-0"
      leave="transition duration-300 ease-in"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-10"
    >
      <div
        className={`flex justify-between absolute bottom-7 px-4 py-2 right-5 z-10 min-h-[50px] w-60 bg-zinc-800 border-l-4 ${
          (notification?.type === "error" ||
            notification?.type === "type-check-fail") &&
          "border-red-500"
        } ${notification?.type === "type-check-pass" && "border-green-500"}`}
      >
        <p className="text-zinc-400">{notification?.message}</p>
        <button onClick={closeHandler}>
          <XMarkIcon className="text-zinc-500 w-6 h-6" />
        </button>
      </div>
    </Transition>
  );
}

export default Snackbar;

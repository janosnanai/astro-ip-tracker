import { Disclosure, Transition } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { ipGeoAtom } from "../utils/atoms/ipGeoAtom";

function SearchResult() {
  const ipGeoData = useStore(ipGeoAtom);

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full z-20 bg-zinc-800 text-zinc-400 mt-2 pr-1">
              <div className="flex py-1 justify-between">
                <p className="px-2">{ipGeoData?.ip || "no match found"}</p>
                <ChevronLeftIcon
                  className={`w-6 h-6 text-purple-400 transition ${
                    open ? "-rotate-90 ease-out" : "rotate-0 ease-in"
                  }`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition ease-out"
              enterFrom="scale-y-0 -translate-y-1/2"
              enterTo="scale-y-100 translate-y-0"
              leave="transition ease-in"
              leaveFrom="scale-y-100 translate-y-0"
              leaveTo="scale-y-0 -translate-y-1/2"
            >
              <Disclosure.Panel className="px-2 py-1 bg-zinc-800 text-zinc-400">
                {ipGeoData && (
                  <ul>
                    <li>{`org: ${ipGeoData.organization}`}</li>
                    <li>{`country: ${ipGeoData.country_name}`}</li>
                    <li>{`city: ${ipGeoData.city}`}</li>
                    <li>{`zip: ${ipGeoData.zipcode}`}</li>
                  </ul>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default SearchResult;

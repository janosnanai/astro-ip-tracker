import { Disclosure } from "@headlessui/react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import formatOffsetToUTC from "../../utils/formatOffsetToUTC";

function SearchResult({
  ipGeoData,
  onNewSearch,
}: {
  ipGeoData: IpGeoResponseData | null;
  onNewSearch: () => void;
}) {
  return (
    <>
      <button
        onClick={onNewSearch}
        className="m-3 p-2 rounded-lg flex align-middle uppercase text-base sm:text-lg text-violet-700 dark:text-amber-500 hover:text-violet-800 dark:hover:text-amber-400 hover:bg-violet-500/25 transition-colors outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
      >
        <ArrowLeftIcon className="my-auto h-4 sm:h-5 w-4 sm:w-5 mr-1" />
        <span>new search</span>
      </button>
      <div>
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="flex flex-col justify-between">
              <ul className="p-3">
                <ListElement title="ip address" content={ipGeoData?.ip || ""} />
                <Disclosure.Panel className="pb-1 text-zinc-400">
                  {ipGeoData && (
                    <>
                      <ListElement
                        title="org."
                        content={ipGeoData?.organization}
                        ruler
                      />
                      <ListElement
                        title="country"
                        img={ipGeoData.country_flag}
                        content={ipGeoData.country_name}
                        ruler
                      />
                      <ListElement title="city" content={ipGeoData.city} />
                      <ListElement
                        title="zip code"
                        content={ipGeoData.zipcode}
                      />
                      <ListElement
                        title="timezone"
                        content={formatOffsetToUTC(ipGeoData.time_zone.offset)}
                        ruler
                      />
                    </>
                  )}
                </Disclosure.Panel>
              </ul>
              <Disclosure.Button className="w-full p-2 flex align-middle uppercase text-lg text-violet-700 dark:text-amber-500 hover:text-violet-800 dark:hover:text-amber-400 hover:bg-violet-500/25 transition-colors outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50">
                <ChevronDownIcon
                  className={`w-6 h-6 m-auto transition ${
                    open ? "-rotate-180 ease-out" : "rotate-0 ease-in"
                  }`}
                />
              </Disclosure.Button>
            </div>
          )}
        </Disclosure>
      </div>
    </>
  );
}

export default SearchResult;

function ListElement({
  title,
  content,
  img,
  ruler = false,
}: {
  title: string;
  content: string;
  img?: string;
  ruler?: boolean;
}) {
  return (
    <>
      {ruler && (
        <div className="m-2 h-[1px] rounded-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      )}
      <li className="flex items-center my-1">
        <p className="w-16 sm:w-28 px-0.5 sm:px-2 uppercase text-[10px] sm:text-xs text-zinc-800 dark:text-zinc-400">
          {title}
        </p>
        <div className="w-40 sm:w-60 flex justify-between items-center">
          <p className="whitespace-normal text-sm sm:text-base sm:tracking-wide text-zinc-900 dark:text-zinc-300">
            {content}
          </p>
          {img && <img src={img} className="h-4 w-8" />}
        </div>
      </li>
    </>
  );
}

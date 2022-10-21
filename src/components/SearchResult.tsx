import { Disclosure } from "@headlessui/react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import formatOffsetToUTC from "../utils/formatOffsetToUTC";

function SearchResult({
  ipGeoData,
  onNewSearch,
}: {
  ipGeoData: IpGeoResponseData | null;
  onNewSearch: () => void;
}) {
  return (
    <div>
      <button
        onClick={onNewSearch}
        className="flex align-middle uppercase text-lg text-purple-500 hover:text-purple-400 transition-colors"
      >
        <ArrowLeftIcon className="my-auto h-6 w-6" />
        <span>new search</span>
      </button>
      <div className="mt-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <ul>
                <ListElement title="ip address" content={ipGeoData?.ip || ""} />
                <Disclosure.Panel className="pb-1 text-zinc-400">
                  {ipGeoData && (
                    <>
                      <ListElement
                        title="organization"
                        content={ipGeoData?.organization}
                        ruler
                      />
                      <ListElement
                        title="country"
                        content={ipGeoData?.country_name}
                        ruler
                      />
                      <ListElement title="city" content={ipGeoData?.city} />
                      <ListElement
                        title="zip code"
                        content={ipGeoData?.zipcode}
                      />
                      <ListElement
                        title="timezone"
                        content={formatOffsetToUTC(ipGeoData?.time_zone.offset)}
                        ruler
                      />
                    </>
                  )}
                </Disclosure.Panel>
              </ul>
              <Disclosure.Button className="w-full text-purple-500 hover:text-purple-400">
                <ChevronDownIcon
                  className={`w-6 h-6 m-auto transition ${
                    open ? "-rotate-180 ease-out" : "rotate-0 ease-in"
                  }`}
                />
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default SearchResult;

function ListElement({
  title,
  content,
  ruler = false,
}: {
  title: string;
  content: string;
  ruler?: boolean;
}) {
  return (
    <>
      {ruler && (
        <div className="m-2 h-0.5 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800" />
      )}
      <li className="flex items-center my-1">
        <p className="w-28 px-2 uppercase text-xs text-zinc-400">{title}</p>
        <p className="w-60 whitespace-normal tracking-wide text-zinc-300">
          {content}
        </p>
      </li>
    </>
  );
}

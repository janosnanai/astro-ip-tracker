import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

function SearchError({
  error,
  onRetry,
  onNewSearch,
}: {
  error: Error | null;
  onRetry: () => void;
  onNewSearch: () => void;
}) {
  return (
    <div className="p-3">
      <button
        onClick={onNewSearch}
        className="flex items-center p-2 rounded-lg text-violet-700 dark:text-amber-500 hover:text-violet-800 dark:hover:text-amber-400 uppercase text-base sm:text-lg hover:bg-violet-500/25 transition-colors outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
      >
        <ArrowLeftIcon className="my-auto h-4 sm:h-5 w-4 sm:w-5 mr-1" />
        <span>new search</span>
      </button>
      <p className="m-3 text-lg text-red-500">Error: {error?.message}</p>
      <button
        onClick={onRetry}
        className="flex items-center p-2 rounded-lg text-violet-700 dark:text-amber-500 hover:text-violet-800 dark:hover:text-amber-400 uppercase text-base sm:text-lg hover:bg-violet-500/25 transition-colors outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
      >
        <ArrowPathIcon className="my-auto h-4 sm:h-5 w-4 sm:w-5 mr-1" />
        <span>retry</span>
      </button>
    </div>
  );
}

export default SearchError;

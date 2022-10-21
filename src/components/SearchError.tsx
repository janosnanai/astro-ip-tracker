import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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
    <div>
      <button
        onClick={onNewSearch}
        className="flex align-middle uppercase text-lg text-purple-500 hover:text-purple-400 transition-colors"
      >
        <ArrowLeftIcon className="my-auto h-6 w-6" />
        <span>new search</span>
      </button>
      <p className="my-3 text-lg text-red-500">Error: {error?.message}</p>
      <button
        onClick={onRetry}
        className="uppercase text-lg text-purple-500 hover:text-purple-400 transition-colors"
      >
        retry
      </button>
    </div>
  );
}

export default SearchError;

import { PuffLoader } from "react-spinners";

function SearchLoading({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="p-3 flex items-center justify-between">
      <PuffLoader color="rgb(139 92 246)" />
      <p className="text-zinc-700 dark:text-zinc-400 text-base sm:text-xl">loading...</p>
      <button
        onClick={onCancel}
        className="p-2 rounded-lg text-violet-700 dark:text-amber-500 hover:text-violet-800 dark:hover:text-amber-400 uppercase text-base sm:text-lg hover:bg-violet-500/25 transition-colors outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50"
      >
        cancel
      </button>
    </div>
  );
}

export default SearchLoading;

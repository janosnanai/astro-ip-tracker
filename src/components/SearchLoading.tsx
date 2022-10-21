import { PuffLoader } from "react-spinners";

function SearchLoading({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <PuffLoader color="rgb(161 161 170)" />
      <p className="text-zinc-400 text-xl">loading...</p>
      <button
        onClick={onCancel}
        className="text-purple-500 hover:text-purple-400 uppercase text-lg"
      >
        cancel
      </button>
    </div>
  );
}

export default SearchLoading;

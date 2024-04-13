import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "./api";
import { useState } from "react";
import { PokeCard } from "./components/PokeCard/PokeCard";

function App() {
  const [page, setPage] = useState(0);
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
  });

  return (
    <div>
      <div className="relative h-[100vh] overflow-y-hidden">
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-4xl animate-bounce">Loading...</span>
          </div>
        ) : error ? (
          <div>Something is wrong... try later</div>
        ) : (
          <div className="h-[90vh] flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4 p-5 overflow-y-scroll">
            {pokemonList &&
              pokemonList.map((pokemon: { name: string; url: string }) => (
                <PokeCard name={pokemon.name} />
              ))}
          </div>
        )}
        <div className="w-full h-[10vh] flex justify-center items-center gap-4 absolute bottom-0">
          <button
            className="w-32 py-1 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-500 disabled:bg-slate-300"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="w-32 py-1 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-500 disabled:bg-slate-300"
            onClick={() => setPage((old) => old + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

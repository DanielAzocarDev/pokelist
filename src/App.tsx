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
    <div className="border border-red-100">
      <div className="relative h-[100vh]">
        {isLoading ? (
          <div>Loading...</div>
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
            className='w-32 py-1 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-500 disabled:bg-slate-300'
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className='w-32 py-1 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-500 disabled:bg-slate-300'
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

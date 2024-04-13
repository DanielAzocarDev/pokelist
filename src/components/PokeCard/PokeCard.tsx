import { useState } from "react";
import { getPokemon } from "../../api";
import { useQuery } from "@tanstack/react-query";

interface PokeCardProp {
  name: string;
}

export const PokeCard = ({ name }: PokeCardProp) => {
  const [openDetail, setOpendetail] = useState<boolean>(false);
  const [seenPokemons, setSeenPokemons] = useState<boolean>(false);
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
  });

  const pokeType = pokemon?.types.map(
    (type: { type: { name: string } }) => type.type.name
  );

  const pokeColors: { [key: string]: string } = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };

  const handleDetails = () => {
    setSeenPokemons(true);
    setOpendetail(!openDetail);
  };

  const images = [
    pokemon?.sprites.front_default,
    ...Object.values(pokemon?.sprites || {}).filter(
      (value) =>
        typeof value === "string" && value !== pokemon?.sprites.front_default
    ),
  ];
  const [imageIndex, setImageIndex] = useState(0);

  const handleSprite = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImageIndex((imageIndex + 1) % images.length);
  };

  console.log({ id: pokemon?.id, seenPokemons });

  return (
    <>
      <div
        style={{
          backgroundColor: pokeType ? pokeColors[pokeType[0]] : "green",
        }}
        className="min-h-48 sm:min-w-56 flex flex-col items-center rounded-md  overflow-hidden"
        onClick={handleDetails}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div className="w-full bg-gray-100/55 flex items-center justify-center">
              <img
                className={seenPokemons ? "opacity-45" : "opacity-100"}
                src={pokemon?.sprites.front_default}
                alt={name}
              />
            </div>
            <span className="pt-2">
              #{pokemon?.id.toString().padStart(3, "0")}
            </span>
            <h2 className="font-bold pb-2">{name}</h2>
            <div className="flex items-center gap-2 pb-4">
              {pokemon?.types.map((type: { type: { name: string } }) => (
                <span className="text-xs" key={type.type.name}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      {openDetail && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-40"
          onClick={handleDetails}
        >
          <div className="min-w-72 w-fit bg-white rounded shadow-lg p-8 m-4 max-w-xs max-h-full text-center">
            <h2 className="mb-4">{pokemon?.name}</h2>
            <div className="flex justify-center relative">
              <div
                style={{
                  backgroundColor: pokeType ? pokeColors[pokeType[0]] : "grey",
                }}
                className="absolute left-8 -top-2 w-24 h-24 rounded-full bg-gray-300 "
              ></div>
              <img
                className="min-w-24 z-10"
                src={images[imageIndex]}
                alt={name}
                onClick={handleSprite}
              />
            </div>
            <p className="mb-4">#{pokemon?.id.toString().padStart(3, "0")}</p>
            <div className="mt-4">
              {pokemon?.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-2 gap-2"
                >
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 py-4">
              {pokemon?.types.map((type: { type: { name: string } }, index) => (
                <span
                  style={{
                    backgroundColor: pokeType
                      ? pokeColors[pokeType[index]]
                      : "#000",
                  }}
                  className="text-xs py-1 px-2 rounded-lg"
                  key={type.type.name}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <button
              className="px-4 py-2 text-white bg-red-400 rounded "
              onClick={handleDetails}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import axios from 'axios';
import { IPokemon, IPokemonList } from '../interfaces';

export const apiPoke = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  // baseURL: 'https://pokeapi.co/api/v2/',
});

export const getPokemons = async (page: number): Promise<IPokemonList[]> => {
  const {data: {results}} = await apiPoke.get(`pokemon/?limit=15&offset=${page === 1 ? 15 : page * 15}`);
  return results;
}

export const getPokemon = async (name: string): Promise<IPokemon> => {
  const {data} = await apiPoke.get(`pokemon/${name}`);
  return data;
}
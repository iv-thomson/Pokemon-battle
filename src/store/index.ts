import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { PokemonModel } from '@/models';

export const rawPokemon$ = new BehaviorSubject<PokemonModel[]>([]);

export const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemonList) => {
    return pokemonList.map((pokemon) => {
      return {
        ...pokemon,
        power: pokemon.attack + pokemon.hp + pokemon.defense + pokemon.speed,
      };
    });
  })
);

export const selected$ = new BehaviorSubject<number[]>([]);

export const deck$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemonList, selected]) => {
    return pokemonList.filter((pokemon) => {
      return selected.includes(pokemon.id);
    });
  })
);

fetch('/pokemon.json')
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));

export interface PokemonModel {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  power?: number;
}

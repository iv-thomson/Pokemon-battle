<script setup lang="ts">
import { deck$ } from '@/store';
import { ref } from 'vue';
import SearchBar from './components/search-bar/SearchBar.vue';
import { PokemonModel } from '@/models';

const deckPokemonList = ref<PokemonModel[]>([]);
const getUrl = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

deck$.subscribe((pokemons) => {
  deckPokemonList.value = pokemons;
});
</script>

<template>
  <div class="level is-align-items-flex-start">
    <section class="section level-left is-flex is-flex-direction-column">
      <p>Select Pokemons to your deck:</p>
      <SearchBar />
    </section>

    <section v-if="deckPokemonList.length" class="section box level-right pokemon-list">
      <div class="is-flex is-flex-direction-column pokemon-list__items">
        <div v-for="pokemon in deckPokemonList" :key="pokemon.id" class="media">
          <div class="media-left">
            <p class="image is-128x128">
              <img :src="getUrl(pokemon.id)" :alt="pokemon.name" />
            </p>
          </div>
          <div class="media-content">
            <div class="content">
              <h5>{{ pokemon.name }}</h5>

              <div class="is-flex gap">
                <label class="label">Power:</label>
                <p>{{ pokemon.power }}</p>
              </div>

              <div class="is-flex gap">
                <label class="label">HP:</label>
                <p>{{ pokemon.hp }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.pokemon-list {
  overflow: auto;
  padding-bottom: 24px;

  &__items {
    max-height: 600px;
  }
}
</style>

<template>
  <div ref="root" class="is-flex is-flex-direction-column search-bar">
    <div class="is-flex">
      <input v-model="search" class="input search-bar__input" @focus="isFocused = true" />
      <button class="button is-light" @click="onClear">x</button>
    </div>
    <div class="dropdown" :class="{ 'is-active': filteredPokemonList.length }">
      <div class="dropdown-menu search-bar__content">
        <div class="dropdown-content">
          <div
            v-for="pokemon in filteredPokemonList"
            :key="pokemon.id"
            class="dropdown-item button is-small is-white"
            :class="{ 'is-primary': isHighlighted(pokemon.id) }"
            @click="onSelect(pokemon.id)"
          >
            {{ pokemon.name }}
            {{ pokemon.power }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pokemonWithPower$, selected$ } from '@/store';
import { computed, onUnmounted, onMounted } from 'vue';
import { ref } from 'vue';
import { PokemonModel } from '@/models';

const root = ref<HTMLElement | null>(null);
const pokemonList = ref<PokemonModel[]>([]);
const search = ref<string>('');
const isFocused = ref<boolean>(true);
const selected = ref<number[]>([]);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  if (root.value?.contains(event.target as Node)) {
    return;
  }
  if (pokemonList.value.length) {
    isFocused.value = false;
  }
}

pokemonWithPower$.subscribe((pokemons) => {
  pokemonList.value = pokemons;
});

const filteredPokemonList = computed(() =>
  pokemonList.value.filter((pokemon) => pokemon.name.toLowerCase().includes(search.value.toLowerCase()))
);

selected$.subscribe((values) => {
  selected.value = values;
});

const isHighlighted = (id: number) => selected.value.includes(id);

const onSelect = (id: number) => {
  if (selected$.value.includes(id)) {
    selected$.next(selected$.value.filter((selectedId) => selectedId !== id));
    return;
  }
  selected$.next([...selected$.value, id]);
};

const onClear = () => {
  search.value = '';
  selected$.next([]);
}
</script>

<style lang="scss">
.search-bar {
  &__content,
  &__input {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
const handleClickBack = () => navigateTo("/");
</script>
<template>
  <Button label="戻る" @click="handleClickBack"></Button>
  <ul>
    <li>
      ①本ページはある時点において
      <a href="https://pokeapi.co/" target="_blank">PokeAPI</a>
      様から取得したデータを基に表示を行っています。
    </li>
  </ul>
</template>

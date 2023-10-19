<template>
  <NuxtLayout>
    <template #header>
      {{ $route.meta.title }}
    </template>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>
